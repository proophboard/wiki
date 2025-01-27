
---
layout: default
title: Expressions
toc_order: 08
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
- 
## Supported Functions

Cody Play/Engine ships with a set of preregistered functions and transforms that are available in Jexl Expressions:

### Count

The `count` function works with different input types:

```typescript
type count = (val: object | Array | string | number | boolean) => number
```
 
#### Count items of an Array

```js
const ctx = { items: ['a', 'b', 'c'] }

jexl.evalSync("count(items)", ctx);

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




## Supported Transforms

Coming soon

## Add your own

Coming soon

