---
layout: default
title: Expressions
toc_order: 10
---

Great software incorporates logic to perform tasks without manual intervention. This can be small tasks like transforming
a set of information into another structure, logical validation, and even fully automated decision-making.

With [Event Modeling on prooph board]({{site.baseUrl}}/event_modeling/event-modeling-on-prooph-board.html) you describe **what** information
is processed by the software, and **how** it changes over time.

But the **HOW** is not only about moving data from A to B. To be able to process information, you need to express logic in a way that the software exactly knows
how to do it.

In [Cody Play]({{site.baseUrl}}/cody_play/a-playground-for-your-design.html) and [Cody Engine]({{site.baseUrl}}/cody_engine/introduction.html) this is done
in the [Javascript Expression Language ](https://github.com/TomFrost/jexl){: target="_blank" rel="noopener noreferrer"}{: .alert-link} (short Jexl).
{: .alert .alert-info}

## Expression + Context

Jexl Expressions are strings that are parsed and executed in a controlled context. Only information explicitly passed to Jexl is available within the expression.
This makes it a more secure alternative to evaluating Javascript directly.
{: .alert .alert-info}

### Basic Example

```js
const context = {say: "Hello World"}

console.log(jexl.evalSync("say", context));

// > Hello World
```

The basic Jexl Syntax is very similar to Javascript, but it is not the same! Check out the [official documentation](https://github.com/TomFrost/jexl){: target="_blank" rel="noopener noreferrer"}{: .alert-link}
and the [playground](https://czosel.github.io/jexl-playground/){: target="_blank" rel="noopener noreferrer"}{: .alert-link}
{: .alert .alert-warning}

## Usage

Jexl Expressions are supported in different JSON configurations:
- Business Rules
- Query Resolver Rules
- Projections
- UI Schema

## Supported Functions

Cody Play/Engine ships with a set of preregistered functions and transforms that are available in Jexl Expressions:

### Count

The `count` function works with different input types:

```typescript
type count = (val: object | Array | string | number | boolean) => number
```

_`count` is also available as transform_

#### Count items of an Array

```js
const ctx = { items: ['a', 'b', 'c'] }

jexl.evalSync("count(items)", ctx);

// or using the transform variant

jexl.evalSync("items|count()", ctx);


// 3
```

#### Count keys of an Object

```js
const ctx = { person: { name: "Jane", age: 35, country: null, married: true}}

jexl.evalSync("count(person)", ctx);

// 3
```

#### Count chars of a string

```js
const ctx = { person: { name: "Jane", age: 35, country: null, married: true}}

jexl.evalSync("count(person.name)", ctx);

// 4
```

#### Count chars of a number

Numbers are converted to strings to also count the chars

```js
const ctx = { person: { name: "Jane", age: 35, country: null, married: true}}

jexl.evalSync("count(person.age)", ctx);

// 2
```
#### Count booleans

Count returns `1` for `true` and `0` for any falsy value: `false`, `null`, `undefined`.

```js
const ctx = { person: { name: "Jane", age: 35, country: null, married: true}}

jexl.evalSync("count(person.married)", ctx);

// 1
```

```js
const ctx = { person: { name: "Jane", age: 35, country: null, married: true}}

jexl.evalSync("count(person.country)", ctx);

// 0
```
### deepMerge

The `deepMerge` function is a wrapper for lodash [_.merge](https://lodash.com/docs#merge), which provides a recursive merge mechanism for objects.

### isRole

Helper function to check if a user has a specific role. If you provide an array of roles, the function returns true if
the user has any of the roles.

```typescript
type isRole = (
  user: User, 
  role: UserRole | UserRole[], 
  disableActiveRoleCheck?: boolean
) => boolean;
```

If you use the **activeRole** feature, the function will only check the user's activeRole. You can disable active role check to
check if any of the user roles matches.
{: .alert .alert-warning}

This function is also provided as a transform. See [role]({{site.baseUrl}}/board_workspace/Expressions.html#role){: .alert-link} for usage example.
{: .alert .alert-info}

### merge

The `merge` function combines two values

```typescript
type merge = <T extends any>(val1: T, val2: any) => T;
```

The type of the first input argument determines the return type. Different strategies are used to merge the two values:

#### Array with Array

```js
const val1 = [1,2,3];
const val2 = [4,5,6];
const ctx = {val1, val2};

jexl.evalSync("merge(val1, val2)", ctx);

// [1,2,3,4,5,6]
```

#### Array with any other type

```js
const val1 = [1,2,3];
const val2 = 4;
const ctx = {val1, val2};

jexl.evalSync("merge(val1, val2)", ctx);

// [1,2,3,4]
```

#### Object with Object

```js
const val1 = {foo: "bar", subKey: {a: "b"}};
const val2 = {baz: "bat", subKey: {c: "d"}};
const ctx = {val1, val2};

jexl.evalSync("merge(val1, val2)", ctx);

// {foo: "bar", baz: "bat", subKey: {c: "d"}}
```

Only the first level of objects are merged. If two objects have the same key, that key is overridden by the second object key.
See [deepMerge]({{site.baseUrl}}/board_workspace/Expressions.html#deepmerge){: .alert-link} for an alternative behavior.
{: .alert .alert-warning}

#### Non object with any other type

If the first input is neither an array nor an object, merge will call the `toString` method on both inputs and concatenate the two strings.

```js
const ctx = {val1: "Hello ", val2: "World"};

jexl.evalSync("merge(val1, val2)", ctx);

// Hello World
```

### nextval

Request the next value of a sequence managed by the document store. 

```typescript
type nextval = (sequenceName: string) => number;
```
This function is only available in backend contexts and might throw an exception if used in the wrong context.
{: .alert .alert-warning}

#### Usage

Cody Engine/Play is using UUIDs for information identifiers. While UUIDs work great technically, they are not user-friendly. For example, it is almost impossible to remember them.
If workflows require humans to deal with information identifiers, you're better off with natural identifiers or auto incremented numbers. In both cases, it is very likely that you
need a sequence to ensure that no two information get the same identifier assigned. 

The `nextval` function makes it easy to use a sequence to assign human-friendly identifiers to information. While the primary identifier is still a UUID, you can use the human-friendly version
to show in the UI and use it as an alternative filter in queries.

#### Example

```js
// The Cody production-stack requires sequences to be created upfront
// In prototype mode, sequences are created automatically 
// on first nextval('your_sequence_name') call
documentStore.addSequence('invoice_number_seq');

// Example of business rule that records an Invoice Created event from a command
// and assigns an additional invoice number as a natural identfier 
// using current data + auto incremented number
const rules = [
  {
    rule: "always",
    then: {
      record: {
        event: "Invoice Created",
        mapping: {
          "$merge": "command",
          invoiceNumber: "now()|isoDate() + nextval('invoice_number_seq')"
        }
      }
    }
  }
]
```

### pageData

PageData is available in many frontend Jexl contexts, especially in [UI Schema]({{site.baseUrl}}/board_workspace/UI-Schema.html) expressions.

Every [Information]({{site.baseUrl}}/event_storming/basic-concepts.html#information) shown on a page, is also available in the **PageData** registry using its namespaced name
e.g. `/App/MyInformation`.

The `pageData` function takes care of the loading state of information. As long as the information is not loaded on the page, `pageData` returns the `defaultValue` (or `undefined` if you did not provide one).

```typescript
type pageData = (pageData: PageData | undefined, name: string, defaultValue: any) => any
```

#### Example

```js
// pageData is provided by Cody
const [pageData] = usePageData();

// Cody always registers pageData in the context under the key "page"
const ctx = {page: pageData};

// The current page shows details of a person like firstname, lastname, ...
// The information of the person is fetched from the backend via a query.
// The namespaced name of the information is /Crm/Person
// We can savely access firstName and it will be "Unknown" as long as 
// the query is still loading (or returned an error)
const firstName = jexl.evalSync(
    `pageData(page, '/Crm/Person', {firstName: ''Unknown}).firstName`, 
    ctx
);
```

`pageData` is also available as a transform function. See [data]({{site.baseUrl}}/board_workspace/Expressions.html#data){: .alert-link} transform for details.
{: .alert .alert-info}

### userAttr

Users can have additional attributes for fine-grained access control or custom information that is not part of the standard user interface.

The `userAttr` function is a convenient helper function to access specific attributes of a user. You can pass a default value that is returned in case the attribute is not set.

```typescript
type userAttr = <T>(
    user: User, 
    attributeName: string, 
    notSetValue?: T
) => T | undefined;
```

#### Example

```js
const user = useUser();
const ctx = {user};

const age = jexl.evalSync(`userAttr(user, 'age', 40)`, ctx);
```

Same example without helper function:

```js
const user = useUser();
const ctx = {user};

const age = jexl.evalSync(`user.attributes.age ? user.attributes.age : 40`, ctx);
```

Same example using the [attr transform]({{site.baseUrl}}/board_workspace/Expressions.html#attr) instead:

```js
const user = useUser();
const ctx = {user};

const age = jexl.evalSync(`user|attr('age', 40)`, ctx);
```

#### Multi-Value Attributes

You might need to assign multiple values to an attribute. This is supported by [Keycloak](https://stackoverflow.com/questions/61132928/keycloak-user-attributes-with-multiple-values-list){: target="_blank" rel="noopener noreferrer"},
which is the default auth service used in the Cody Engine production stack. 

But be aware, that you need to take care of the attribute type yourself. A multivalued attribute is of type `array` if multiple values are set, but of type `string` if only one value is set.
{: .alert .alert-warning}

To get around the type mismatch, you can force an `array` type by always casting the attribute value to a list.

```js
const user = useUser();
const ctx = {user};

const hobbies = jexl.evalSync(`user|attr('hobby')|list()`, ctx);
```

### uuid

Generate a random [version 4 UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)){: target="_blank" rel="noopener noreferrer"}.

#### Example

```js
jexl.evalSync(`uuid()`)

// 972a00c6-0160-4ddf-aae9-ea067ce0efe3
```


## Supported Transforms

Transforms let you chain function calls, whereby the first input of the transform is taken from the previous output.

Transforms are chained using the pipe operator `|`.
{: .alert .alert-info}

### Example

```js
const person = {
  firstname: "Jane",
  laastname: "Doe"
}

const ctx = {person};

// Here we use two Object transforms: "set" and "pick"
jexl.evalSync(`person|set('age', 35)|pick(['firstname', 'age'])`, ctx);

// {firstname: "Jane", age: 35}
```

### attr

Same as [userAttr]({{site.baseUrl}}/board_workspace/Expressions.html#userattr), but provided as a transform.

### data

Same as [pageData]({{site.baseUrl}}/board_workspace/Expressions.html#pagedata), but provided as a transform. Since Cody always registers page data under the key `page` in a Jexl Context
you can write the person example from the function description like this:

```js
const [pageData] = usePageData();

const ctx = {page: pageData};

const firstName = jexl.evalSync(
    `page|data('/Crm/Person', {firstName: ''Unknown}).firstName`, 
    ctx
);
```

### role

Same as [isRole]({{site.baseUrl}}/board_workspace/Expressions.html#isrole), but provided as a transform. 

In the frontend, Cody registers the current user in each context under the key `user`.
{: .alert .alert-info}

#### FE Example

```js
// Current user, let's assume we're logged in with an "Admin" role
const user = useUser();

// Always available in frontend context (ensured by Cody)
const ctx = {user};

// Check if the user has the "Admin" role
jexl.evalSync(`user|role('Admin')`, ctx);

// true
```

In backend contexts like business rules, you have access to the user who triggered the action. You can access it via the `meta` object.
{: .alert .alert-info}

#### BE Example

```typescript
async function handleChangeProductPrice(command: Command<ChangeProductPrice>)
    : Promsie {
  // Command metadata includes the user who triggered the command
  const meta = command.meta;
  const payload = command.payload;
  
  const ctx = {command: payload, meta};
  
  if(!await jexl.eval(`meta.user|role('Admin')`, ctx)) {
    throw new Error(`Operation not allowed!`)
  }
  
  // ...
}

```

### typeof

Performs a type check.

```js
const countdown = 10;
const ctx = {countdown};

jexl.evalSync(`countdown|typeof('number')`, ctx);

// true
```

## Array functions

### contains

Check if an array contains a specific value.

**available as: function, transform**

```js
const tags = ['frontend', 'feature', 'easy'];
const ctx = {tags};

jexl.evalSync(`tags|contains('easy')`, ctx);

// true

```

### filter

Returns a new array that includes all values for which the filter expression returns true.

**available as: function, transform**

```typescript
type filter = (arr: Array, expression: string, filterContext?: object) => Array;
```
The `expression` has access to the `item` (alias `_`) and the `index` of the item. If you need to access variables from the 
parent context, you have to pass them explicitly to the optional `filterContext`.

```js
const colors = ['red', 'blue', 'orange', 'green', 'grey'];
const eventModelingColors = ['blue', 'organge', 'green'];
const ctx = {colors, eventModelingColors};

const filteredColors = jexl.evalSync(
    `colors|filter('emc|contains(item)', {emc: eventModelingColors})`, 
    ctx
);

// ['blue', 'organge', 'green']
```

### first

Get the first item of an array. If array is empty `undefined` is returned or the optional `notSetValue`.

**available as: transform**

```typescript
type first = <T extends unknown>(
    arr: Array<T>, 
    notSetValue?: T
) => T | undefined;
```

#### Example

```js
const colors = ['red', 'blue', 'orange', 'green', 'grey'];
const emptyList = [];
const ctx = {colors, emptyList};

jexl.evalSync(`colors|first()`, ctx);

// 'red'

jexl.evalSync(`emptyList|first('Default')`, ctx);

// 'Default'
```



### join

Concatenate all array items to a string using an optional separator.

**available as: function, transform**

```typescript
type join = (arr: Array, separator?: string) => string;
```

#### Example

```js
const colors = ['red', 'blue', 'orange', 'green', 'grey'];
const ctx = {colors};

jexl.evalSync(`colors|join('-')`, ctx);

// "red-blue-orange-green-grey"
```

### list

Cast any type to an array. If input type is already an array, it is returned as-is.

**available as: transform**

```typescript
type list = <T extends unknown>(v: T) => T[];
```

#### Example

```js
const hobbies = "running";

jexl.evalSync(`hobbies|list()|push('traveling')`, {hobbies});

// ["running", "traveling"]
```


### last

Get the last item of an array. If array is empty `undefined` is returned or the optional `notSetValue` if passed to `last`.

**available as: transform**

```typescript
type last = <T extends unknown>(arr: Array<T>, notSetValue?: T) => T | undefined;
```

#### Example

```js
const colors = ['red', 'blue', 'orange', 'green', 'grey'];
const emptyList = [];
const ctx = {colors, emptyList};

jexl.evalSync(`colors|last()`, ctx);

// 'grey'

jexl.evalSync(`emptyList|last('Default')`, ctx);

// 'Default'
```

### map

Invokes a mapping expression for each item and returns a new array containing all mapped items.

**available as: function, transform**

```typescript
type map = (arr: Array, expression: string, filterContext?: object) => Array;
```

The `expression` has access to the `item` (alias `_`) and the `index` of the item. If you need to access variables from the
parent context, you have to pass them explicitly to the optional `filterContext`.

#### Example

```js
const colors = ['red', 'blue', 'orange', 'green', 'grey'];
const eventModelingColors = ['blue', 'organge', 'green'];
const ctx = {colors, eventModelingColors};

// Call the "upper" string trasform for each item of the colors array, 
// if it is an event modeling color
jexl.evalSync(
    `colors|map('emc|contains(item) ? item|upper() : item', {emc: eventModelingColors})`, 
    ctx
);

// ['red', 'BLUE', 'ORANGE', 'GREEN', 'grey']
```

### orderBy

Wrapper for lodash [_.orderBy](https://lodash.com/docs#orderBy).

**available as: transform**

#### Example

```js
const users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// Sort by `user` in ascending order and by `age` in descending order.
jexl.evalSync(`users|orderBy(['user', 'age'], ['asc', 'desc'])`, {users});
/*
 * [
 *   { 'user': 'barney', 'age': 36 }
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'fred',   'age': 40 },
 * ]
 */
```



### push

Returns a new array with the value added at the end. The input array is not modified.

**available as: function, transform**

```typescript
type push = <T>(arr: Array<T> | unknown | undefined, val: T) => Array<T>;
```

If the input array is undefined, val is added to an empty array.

If the `arr` is not of type array, a new array is returned containing both: `[arr, val]`. 



```js
const numbers = [1,2,3];
const ctx = {numbers};

const extendedNumbers = jexl.evalSync(`numbers|push(4)|push(5)`, ctx);

// [1,2,3,4,5]
```



## Object-specific transforms

### get

Get a value from an object or array. Use `.` to access subkeys. 

**available as: transform**

```typescript
type get = <T>(obj: object | Array<unknown>, path: string, notSetValue?: T | undefined) => T | undefined;
```

#### Example

```js
const person = {
  name: 'Jane',
  address: {
    street: 'Mainstreet'
  }
}

const ctx = {person}

jexl.evalSync(`person|get('address.street')`, ctx);

// Mainsteet

// Pass a default value in case path is not set
jexl.evalSync(`person|get('address.city', 'Unknown City')`, ctx);

// Unknown City

```

### keys

Get a list of the keys of an object.

**available as: transform**

```typescript
type keys = <T extends object, K extends keyof T>(obj: T) => K[];
```

#### Example

```js
const pet = { name: "Lessy", animal: "dog", breed: "Colie" };
const ctx = {pet};

jexl.evalSync(`pet|keys()`, ctx);

// ["name", "animal", "breed"]
```

### pick

Extract a subset from an object into a new object. Use `.` to extract subkeys.

**available as: transform**

```ts
type pick = <T extends object>(obj: T, paths: string[]) => Partial<T>;
```

#### Example

```js
const pet = { name: "Lessy", animal: "dog", breed: "Colie" };
const ctx = {pet};

jexl.evalSync(`pet|pick(['name', 'breed'])`, ctx);

// { name: "Lessy", breed: "Colie" }
```



### set

Set a value of an object or array path. Use `.` to set subkeys. If path does not exist, subkeys are created.

**available as: transform**

```typescript
type set = <T extends object>(obj: T, path: string, value: any) => T;
```

#### Example

```js
const person = {name: "Jane"}

const ctx = {person}

jexl.evalSync(`person|set('address.street', 'Mainstreet')`, ctx);

console.log(ctx.person);

// { name: 'Jane', address: { street: 'Mainstreet' } }
```

### unset

Delete a key of an object or array path. Use `.` to unset subkeys. If path does not exist, nothing happens.

**available as: transform**

```typescript
type unset = <T extends object>(obj: T, path: string) => T;
```
#### Example

```js
const user = {username: 'John', locked: true};
const ctx = {user};

// or transform
jexl.evalSync(`user|unset('locked')`, ctx);

console.log(ctx.user);

// { username: 'John' }
```



### values

Get a list of the values of an object.

**available as: transform**

```typescript
type values = <T extends object, V extends T[keyof T]>(obj: T) => V[];
```

#### Example

```js
const pet = { name: "Lessy", animal: "dog", breed: "Colie" };
const ctx = {pet};

jexl.evalSync(`pet|values()`, ctx);

// ["Lessy", "dog", "Colie"]
```

## String transforms

### lower

Converts all characters of the string to lower case.

**available as: transform**

#### Example

```js
const msg = 'HELLO';

jexl.evalSync(`msg|lower()`, {msg});

// hello
```

### split

Splits a string into parts using a separator. The default separator is " ".

**available as: transform**

#### Example

```js
const path = "first.second.third";

jexl.evalSync(`path|split('.')`, {path});

// ["first", "second", "third"]
```

### trim

Removes whitespace from both ends of the string.

**available as: transform**

#### Example

```js
const msg = "   Hello    ";

jexl.evalSync(`msg|trim()`, {msg});

// "Hello"
```

### trimStart

Removes whitespace from the start of the string.

**available as: transform**

#### Example

```js
const msg = "   Hello    ";

jexl.evalSync(`msg|trimStart()`, {msg});

// "Hello    "
```

### trimEnd

Removes whitespace from the end of the string.

**available as: transform**

#### Example

```js
const msg = "   Hello    ";

jexl.evalSync(`msg|trimEnd()`, {msg});

// "   Hello"
```

### upper

Converts all characters of the string to upper case.

**available as: transform**

#### Example

```js
const msg = 'hello';

jexl.evalSync(`msg|upper()`, {msg});

// HELLO
```

## Type Cast Transforms

### toInt

Cast a string to an integer.

**available as: transform**

#### Example

```js
const age = "42";

jexl.evalSync(`age|toInt()`, {age});

// 42
```

### toFloat

Cast a string to a floating point number.

**available as: transform**

#### Example

```js
const price = "10.99";

jexl.evalSync(`price|toFloat()`, {price});

// 10.99
```

### toStr

Cast any type to string.

**available as: transform**

#### Example

```js
const price = 10.99;

jexl.evalSync(`price|toStr()`, {price});

// "10.99"
```

### toJSON

Calls [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify){: target="_blank" rel="noopener noreferrer"} on a value.

**available as: transform**

```typescript
type toJSON = (val: unknown, space?: number) => string;
```

If `space` is passed as an argument, the JSON string gets formatted using the number of spaces for indentation.

#### Example

```js
const person = {name: "Jane", age: 35};

jexl.evalsync(`person|toJSON(2)`, {person});

// '{
//   "name": "Jane",
//   "age": 35
// }'
```

### fromJSON

Calls [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse){: target="_blank" rel="noopener noreferrer"} on a JSON string.

**available as: transform**

#### Example

```js
const person = '{"name": "Jane", "age": 35}'

jexl.evalSync(`person|fromJSON()`, {person});

// {name: "Jane", age: 35}
```

### toArray

Alias for [list]({{site.baseUrl}}/board_workspace/Expressions.html#list).


## Math Transforms

### round

Calls Lodash [_.round](https://lodash.com/docs/5#round){: target="_blank" rel="noopener noreferrer"} to compute number rounded to precision.

**available as: transform**

```typescript
type round = (val: number, precision?: number) => number;
```

If precision is not set, val is rounded to the nearest integer.

#### Example

```js
const price = 10.93;

jexl.evalSync(`price|round()`, {price});

// 11

jexl.evalSync(`price|round(1)`, {price});

// 10.9
```

### ceil

Calls Lodash [_.ceil](https://lodash.com/docs/5#ceil){: target="_blank" rel="noopener noreferrer"} to compute number rounded up to precision.

**available as: transform**

```typescript
type ceil = (val: number, precision?: number) => number;
```

If precision is not set, val is rounded up to next integer.

#### Example

```js
const price = 10.83;

jexl.evalSync(`price|ceil()`, {price});

// 11

jexl.evalSync(`price|ceil(1)`, {price});

// 10.9
```

### floor

Calls Lodash [_.floor](https://lodash.com/docs/5#floor){: target="_blank" rel="noopener noreferrer"} to compute number rounded down to precision.

**available as: transform**

```typescript
type floor = (val: number, precision?: number) => number;
```

If precision is not set, val is rounded down to integer.

#### Example

```js
const price = 10.83;

jexl.evalSync(`price|floor()`, {price});

// 10

jexl.evalSync(`price|floor(1)`, {price});

// 10.8
```

## Datetime functions and transforms

### now

Constructs a new `Date` from current date and time.

**available as: function**

#### Example

```js
console.log("This docu part was written at: " + jexl.evalSync(`now()|isoDateTime()`));

// This docu part was written at: 2025-02-14T20:41:02.032Z
```

### date

Constructs a new `Date` from given `number | string | Date`.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032Z";

jexl.evalSync(`docuTime|date()|year()`, {docuTime});

// 2025
```

### utc

Returns a string representing this date in the [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1){: target="_blank" rel="noopener noreferrer"} format, with negative years allowed.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032Z";

jexl.evalSync(`docuTime|utc()`, {docuTime});

// 'Fri, 14 Feb 2025 20:51:44 GMT'
```

### isoDate

Returns a string representing this date in the [date time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format){: target="_blank" rel="noopener noreferrer"} using only the date part.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032Z";

jexl.evalSync(`docuTime|isoDate()`, {docuTime});

// '2025-02-14'
```

### isoTime

Returns a string representing this date in the [date time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format){: target="_blank" rel="noopener noreferrer"} using only the time part.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032Z";

jexl.evalSync(`docuTime|isoTime()`, {docuTime});

// 20:41:02.032Z
```

### isoDateTime

Returns a string representing this date in the [date time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format){: target="_blank" rel="noopener noreferrer"}.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032Z";

jexl.evalSync(`docuTime|isoDateTime()`, {docuTime});

// 2025-02-14T20:41:02.032Z
```

### localDate

Returns a string representing the date portion of the given date according to language-specific conventions.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:0.032+01:00";

jexl.evalSync(`docuTime|localDate()`, {docuTime});

// e.g. German date format:  '14.2.2025' 
```

### localTime

Returns a string representing the time portion of the given date according to language-specific conventions.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|localTime()`, {docuTime});

// e.g. German time format:  '20:41:02' 
```

### localDateTime

Returns a string representing the given date according to language-specific conventions.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|localDateTime()`, {docuTime});

// e.g. German time format:  '14.2.2025 20:41:02' 
```

### year

Returns the year for the given date according to local time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|year()`, {docuTime});

// 2025
```

### utcYear

Returns the year for the given date according to universal time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utcYear()`, {docuTime});

// 2025
```

### month

Returns the month for the given date according to local time, as a zero-based value (where zero indicates the first month of the year).

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|month()`, {docuTime});

// 1
```

### utcMonth

Returns the month for the given date according to universal time, as a zero-based value (where zero indicates the first month of the year).

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utcMonth()`, {docuTime});

// 1
```

### day

Returns the day of the month for the given date according to local time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|day()`, {docuTime});

// 14
```

### utcDay

Returns the day of the month for the given date according to universal time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utcDay()`, {docuTime});

// 14
```

### weekDay

Returns the day of the week for the given date according to local time, where 0 represents Sunday.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|weekDay()`, {docuTime});

// 5
```

### utcWeekDay

Returns the day of the week for the given date according to universal time, where 0 represents Sunday.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utcWeekDay()`, {docuTime});

// 5
```

### hours

Returns the hours for the given date according to local time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|hours()`, {docuTime});

// 20
```

### utcHours

Returns the hours for the given date according to universal time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utcHours()`, {docuTime});

// 19
```

### minutes

Returns the minutes for the given date according to local time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|minutes()`, {docuTime});

// 41
```

### utcMinutes

Returns the minutes for the given date according to universal time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utcMinutes()`, {docuTime});

// 41
```

### seconds

Returns the seconds for the given date according to local time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|seconds()`, {docuTime});

// 2
```

### utcSeconds

Returns the seconds for the given date according to universal time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utcSeconds()`, {docuTime});

// 2
```

### milliseconds

Returns the milliseconds for the given date according to local time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|milliseconds()`, {docuTime});

// 32
```

### utcMilliseconds

Returns the milliseconds for the given date according to universal time.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|utMilliseconds()`, {docuTime});

// 32
```

### timezoneOffset

Returns the difference, in minutes, between the given date as evaluated in the UTC time zone, and the same date as evaluated in the local time zone.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|timezoneOffset()`, {docuTime});

// Local timezone Europe/Paris: -60
```

### timestamp

Returns the number of milliseconds for the given date since the [epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date){: target="_blank" rel="noopener noreferrer"}, which is defined as the midnight at the beginning of January 1, 1970, UTC.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|timestamp()`, {docuTime});

// 1739562062032
```

### addMilliseconds

Adds the number of milliseconds to the given date and returns the resulting timestamp.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|addMilliseconds(10)`, {docuTime});

// 1739562062042
```

### subMilliseconds

Subtracts the number of milliseconds from the given date and returns the resulting timestamp.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|subMilliseconds(10)`, {docuTime});

// 1739562062022
```

### addSeconds

Adds the number of seconds to the given date and returns the resulting timestamp.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|addSeconds(5)`, {docuTime});

// 1739562067032
```

### subSeconds

Subtracts the number of seconds from the given date and returns the resulting timestamp.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|subSeconds(5)`, {docuTime});

// 1739562057032
```

### addMinutes

Adds the number of minutes to the given date and returns the resulting timestamp.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|addMinutes(2)`, {docuTime});

// 1739562182032
```

### subMinutes

Subtracts the number of minutes from the given date and returns the resulting timestamp.

**available as: transform**

#### Example

```js

const docuTime = "2025-02-14T20:41:02.032+01:00";

jexl.evalSync(`docuTime|subMinutes(2)`, {docuTime});

// 1739561942032
```

### addHours

Adds the number of hours to the given date and returns the resulting timestamp.

**available as: transform**

### subHours

Subtracts the number of hours from the given date and returns the resulting timestamp.

**available as: transform**

### addDays

Adds the number of days to the given date and returns the resulting timestamp.

**available as: transform**

### subDays

Subtracts the number of days from the given date and returns the resulting timestamp.

**available as: transform**

### addWeeks

Adds the number of weeks to the given date and returns the resulting timestamp.

**available as: transform**

### subWeeks

Subtracts the number of weeks from the given date and returns the resulting timestamp.

**available as: transform**


## Add your own

Coming soon

