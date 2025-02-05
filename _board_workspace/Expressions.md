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

```JS
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

The `deepMerge` function is a wrapper for [lodash.merge](https://lodash.com/docs#merge), which provides a recursive merge mechanism for objects.

### isRole

Helper function to check if a user has a specific role. If you provide an array of roles, the function returns true if
the user has any of the roles.

```typescript
type isRole = (user: User, role: UserRole | UserRole[], disableActiveRoleCheck?: boolean) => boolean;
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
// In prototype mode, sequences are created automatically on first nextval('your_sequence_name') call
documentStore.addSequence('invoice_number_seq');

// Example of business rule that records an Invoice Created event from command data
// and assigns an additional invoice number as a natural identfier using current data + auto incremented number
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

// Let's say the current page shows details of a person like firstname, lastname, ...
// The information of the person is fetched from the backend via a query.
// The namespaced name of the information is /Crm/Person
// We can savely access firstName and it will be "Unknown" as long as the query is still loading (or returned an error)
const firstName = jexl.evalSync(`pageData(page, '/Crm/Person', {firstName: ''Unknown}).firstName`, ctx);
```

`pageData` is also available as a transform function. See [data]({{site.baseUrl}}/board_workspace/Expressions.html#data){: .alert-link} transform for details.
{: .alert .alert-info}

### userAttr

Users can have roles for role-based access control and additional attributes for fine-grained access control to specific information. Attributes can also be used to assign custom 
properties to users that are not part of the standard user interface used in the Cody Engine.

The `userAttr` function is convenient helper function to access specific attributes of a user. You can pass a default value to function that is returned in case the attribute is not for 
the given user.

```typescript
type userAttr = <T>(user: User, attributeName: string, notSetValue?: T) => T | undefined;
```

#### Example

```js
const user = useUser();
const ctx = {user};

const age = jexl.evalSync(`userAttr(user, 'age', 14)`, ctx);
```

Same example without helper function:

```js
const user = useUser();
const ctx = {user};

const age = jexl.evalSync(`user.attributes.age ? user.attributes.age : 14`, ctx);
```

Same example using the [attr transform]({{site.baseUrl}}/board_workspace/Expressions.html#attr) instead:

```js
const user = useUser();
const ctx = {user};

const age = jexl.evalSync(`user|attr('age', 14)`, ctx);
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

const firstName = jexl.evalSync(`page|data('/Crm/Person', {firstName: ''Unknown}).firstName`, ctx);
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
async function handleChangeProductPrice(command: Command<ChangeProductPrice>): Promsie {
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

const filteredColors = jexl.evalSync(`colors|filter('emc|contains(item)', {emc: eventModelingColors})`, ctx);

// ['blue', 'organge', 'green']
```


### push

Returns a new array with the value added at the end. The input array is not modified.

```typescript
type push = <T>(arr: Array<T> | unknown | undefined, val: T) => Array<T>;
```

If the input array is undefined, val is added to an empty array.

If the `arr` is not of type array, a new array is returned containing both: `[arr, val]`. 

**available as: function, transform**

```js
const numbers = [1,2,3];
const ctx = {numbers};

const extendedNumbers = jexl.evalSync(`numbers|push(4)|push(5)`, ctx);

// [1,2,3,4,5]
```



## Object-specific functions and transforms





## Add your own

Coming soon

