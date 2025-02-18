---
layout: default
title: Rule Engine
toc_order: 11
---

To express logic, prooph board offers a rule engine that is interpreted by [Cody Play]({{site.baseUrl}}/cody_play/a-playground-for-your-design.html) and [Cody Engine]({{site.baseUrl}}/cody_engine/introduction.html).

This page describes how the rule engine works and what rules are available in which scopes.
{: .alert .alert-info}

## Basic Rule Structure

Rules are defined as JSON objects flavoured with [Jexl Expressions]({{site.baseUrl}}/board_workspace/Expressions.html) to make them dynamic.
The various editors in the prooph board [Metadata sidebar]({{site.baseUrl}}/board_workspace/Metadata.html) will help you to write rules by validating the structure and making suggestions.

### Always vs. Condition

The most basic information about a rule is if it should `always` be executed or only on certain `condition`:

```js
const rules = [
  {
    // This rule is always executed
    "rule": "always",    
    "then": {
      // ...
    }
  },
  {
    "rule": "condition",
    "if": "...", // Jexl expression that returns true or a falsy value
    "then": {
      // then block is executed when condition is true
    },
    "else": {
      // [optional] else block is executed when condition is falsy
    },
    // [optional] If condition is not met, you can stop the execution
    "stop": true
  },
  {
    "rule": "condition",
    "if_not": "...", // Jexl expression that returns true or a falsy value
    "then": {
      // then block is executed when condition is NOT true
    },
    "else": {
      // [optional] else block is executed when condition is true
    },
    // [optional] If condition is not met, you can stop the execution
    "stop": true
  }
]
```

### Then

The `then` part of a rule contains the actual processing logic. An `else` part of a conditional rule is similar to `then` and describes an alternative processing logic if the condition is not met.

#### Example

Here is an example of a log msg rule that is always executed:

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "log": {
        // Please note: msg is a Jexl Expression, if we want to log a string, 
        // we have to enclose it in single qoutes
        "msg": "'Hello from Cody Rule Engine'"
      }
    }
  }
]
```

## Scopes

The rule engine is used in different parts of the system. A scope defines which rules are allowed, for example you can only record events in a command handling scope aka. Business Rules.

### Allowed in all scopes

- [assign variable]({{site.baseUrl}}/board_workspace/Rule-Engine.html#assign-variable)
- [forEach]({{site.baseUrl}}/board_workspace/Rule-Engine.html#foreach)
- [execute rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#execute-rules)
- [log msg]({{site.baseUrl}}/board_workspace/Rule-Engine.html#log-msg)
- [throw error]({{site.baseUrl}}/board_workspace/Rule-Engine.html#throw-error)

### Information Lookup Rules

Allowed in most backend scopes.

- count information
- find information
- find information by id
- find partial information
- find one information
- find one partial information
- find one partial information by id
- lookup user
- lookup users

### Business Rules

[Commands]({{site.baseUrl}}/event_storming/basic-concepts.html#command) trigger business rules. The outcome of a processed command
is recorded as an event and stored in the event store (@TODO: add link). Business rules should protect invariants by checking the
current state of the system against the desired change represented by the command.

If you use [Aggregate]({{site.baseUrl}}/event_storming/basic-concepts.html#aggregate){: .alert-link} cards, business rules are defined on those cards, otherwise they are defined
directly on [Command]({{site.baseUrl}}/event_storming/basic-concepts.html#command){: .alert-link} cards. Event Modeling does not specify aggregates and encourages a design purely based on 
commands, events and information. Hence, prooph board can deal with both variants and gives you freedom of choice.
{: .alert .alert-info}

#### Available Rules

- record event
- call service
- [information lookup rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#information-lookup-rules)

#### Jexl Context

- `command`: data of the command
- `meta`: metadata of the command (incl. current `user`)
- `information`: current state of the aggregate, only set in aggregate business rules
- Command Dependencies (@TODO: add link)

#### Examples

Default rule, that records a "Room Booked" event with the data of the command:

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "record": {
        "event": "Room Booked",
        "mapping": "command"
      }
    }
  }
]
```

Same scenario as above, but this time with a business rule that a room can only be booked, if it is available.
Each room is an aggregate and keeps track of its availability per day.

```js
const rules = [
  {
    "rule": "condition",
    // "information" is the current room aggregate state
    "if": "information.bookedAt|contains(command.day)",
    "then": {
      "record": {
        // We could also throw an error, but recording a failed event 
        // is the more elegant way to deal with this situation
        "event": "Room Booking Failed",
        "mapping": {
          "roomId": "command.roomId",
          "reason": "'Room is already booked at: ' + command.day"
        }
      }
    },
    "else": {
      "record": {
        "event": "Room Booked",
        "mapping": "command"
      }
    }
  }
]
```

### Event Apply Rules

When working with event sourced [aggregates]({{site.baseUrl}}/event_storming/basic-concepts.html#aggregate), each aggregate event is applied to the aggregate state.

### Processor Rules

- trigger command
- call service
- [information lookup rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#information-lookup-rules)

### Resolver Rules

TODO: Describe `where` shortcut and default variable `information`

- call service
- [information lookup rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#information-lookup-rules)

### Projector Rules

TODO: Describe structure of projector rules and difference between `given, when, then`.

### Initialize Information Rules

TODO: Describe purpose

Only assign variable rules are allowed.

## Rules

### Assign Variable

Set a new or override an existing variable in the rule execution context.

```typescript
interface ThenAssignVariable {
  assign: {
    variable: string;
    value: PropMapping;
  }
}
```

`assign.variable` defines the name of the variable within the context.

`assing.value` sets the value of the variable using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)

#### Example

```js
const ctx = {};

const rules = [
  {
    "rule": "always",
    "then": {
      "assign": {
        // After this rule, "msg" is set in ctx
        "variable": "msg",
        // Note: value is treated as an expression
        // if we want to set a fixed string value
        // we have to use single qoutes insight double qoutes
        // to let the expression return a string
        "value": "'Have nice day!'"
      }
    }
  },
  {
    "rule": "condition",
    // Check if it's Sunday
    "if": "now()|weekDay() == 0",
    "then": {
      "assign": {
        // Override variable "msg", if it's Sunday
        "variable": "msg",
        "value": "'Have nice Sunday!'"
      }
    }
  }
]

await ruleEngine.exec(rules, ctx);

console.log(ctx.msg);

// On Sundays log will be: "Have a nice Sunday!"
// On all other days log will be: "Have a nice day!"
```

### forEach

Execute a rule for each array item.

```typescript
interface ThenForEach {
  forEach: {
    variable: string;
    then: ThenType;
  }
}
```

`forEach.variable` defines the context variable that should be used for the loop.

`forEach.then` defines the rule to be executed for each item of `variable`.
Within the for each loop, `item` (alias `_`) and `itemIndex` are available as variables.

💡 Tip: Use [execute rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#execute-rules){: .alert-link} to execute more than one rule per item.
{: .alert .alert-info}

#### Example

```js
// Invoice example context
const ctx = {
  positions: [
    {
      label: 'Product A',
      price: 10.99
    },
    {
      label: 'Product B',
      price: 5.50
    }
  ],
  // Initialize total with zero, calculation happens in the rules
  total: 0,
}

const rules = [
  {
    "rule": "always",
    "then": {
      "forEach": {
        // Iterate over all positions
        "variable": "positions",
        "then": {
          // Calculate total, by adding each position price to current total
          "assign": {
            "variable": "total",
            "value": "total + item.price"
          }
        }
      }
    }
  }
]

await ruleEngine.exec(rules, ctx);

console.log(ctx.total);

// 16.49
```

### Execute Rules

Defines a rule that executes a list of sub-rules. Useful to nest rules in a [condition]({{site.baseUrl}}/board_workspace/Rule-Engine.html#always-vs-condition) or [forEach rule]({{site.baseUrl}}/board_workspace/Rule-Engine.html#foreach).

```typescript
interface ThenExecuteRules {
  execute: {
    rules: Rule[]
  }
}
```

#### Example

```js
const rules = [
  {
    "rule": "condition",
    "if": "order.submitted",
    "then": {
      "execute": {
        "rules": [
          {
            "rule": "always",
            "then": {
              "call": {
                "service": "Invoicing",
                "method": "generate",
                "arguments": ["order"]
              }
            }
          },
          {
            "rule": "always",
            "then": {
              "call": {
                "service": "Shipping",
                "method": "prepare",
                "arguments": ["order"]
              }
            }
          }
        ]
      }
    }
  }
]
```

### Log Msg

Log a message to console to provide debugging information.

```typescript
interface ThenLogMessage {
  log: {
    msg: JexlExpression | JexlExpression[],
    logLevel?: 'info' | 'error' | 'warn'
  }
}
```

`log.msg` can be an [expression]({{site.baseUrl}}/board_workspace/Expressions.html) or a list of expressions to log multiple values at once.

`log.logLevel` defines the log level. Defaults to `info`.

#### Example

```js
const rules = [
  {
    "rule": "condition",
    "if_not": "order.submitted",
    "then": {
      // js equivalent would be: 
      // console.error("Failed to process order: ", order)
      "log": {
        "msg": ["'Failed to process order: '", "order"],
        "logLevel": "error"
      }
    },
    "stop": true,
  },
  {
    // ...
  }
]
```

### Throw Error

Stop the entire execution flow (e.g. command handling) and throw an error.

```typescript
interface ThenThrowError {
  throw: {
    error: JexlExpression
  }
}
```

Errors are caught on API level and translated into error responses. All errors 
are also logged in the server console. If an error is thrown in a live projection (@TODO: add link)
all database changes are rolled back, meaning other projection changes as well as recorded events.
{: .alert .alert-info}

#### Example

```js
const rules = [
  {
    "rule": "condition",
    "if_not": "order.submitted",
    "then": {
      "throw": {
        "error": "'Failed to process order: ' + order.orderId",
      }
    }
  },
  {
    // ...
  }
]
```

### Count Information



### Property Mapping

Set complex data structures using Jexl-flavoured JSON.

Most examples across this section demonstrate the functionality of Property Mapping (PropMapping) using [Record Event]({{site.baseUrl}}/board_workspace/Rule-Engine.html#record-event){: .alert-link}
rules, but it works in other rules as well. Check the specific rule sections for details.
{: .alert .alert-info}

#### Map an entire object

In a message-based system like [Cody Engine]({{site.baseUrl}}/cody_engine/introduction.html) you often need to copy data from one message to another to continue the data flow.
Best example is when recording an event to capture the outcome of handling a command. In many cases, command data is passed 1:1 to the event.
Hence, Property Mapping can be a single [expression]({{site.baseUrl}}/board_workspace/Expressions.html) that provides the value to be set.



```js
// Example context set up by Cody in the Business Rules scope
const ctx = {
  command: command.payload,
  meta: command.meta
}

const rules = [
  {
    "rule": "always",
    "then": {
      "record": {
        "event": "Post Published",
        // Here is the PropMapping defined for the event.
        // The expression simply provides the data set in the variable "command"
        // The rule logic takes the data and passes it to the event constructor.
        "mapping": "command"
      }
    }
  }
]

await ruleEngine.exec(rules, ctx);
```

#### Merge

Another common scenario is to take all data from one object and extend it with additional information.
You can use the special keyword `$merge` to do so. The value of `$merge` is of type `PropMapping` again.

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "record": {
        "event": "Post Published",
        "mapping": {
          // Merge all data into the object
          "$merge": "command",
          // + set an additional property
          "publishedAt": "now()"
        }
      }
    }
  }
]
```

If the value of `$merge` is of type `array`, all array items are treated as Property Mappings and merged into the target object.


If two or more items provide objects with same property names, property values of later items override earlier ones.
{: .alert .alert-warning}

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "record": {
        "event": "Post Published",
        "mapping": {
          "$merge": [
            // First, merge all data from the command
            "command",
            // Second, merge all user data
            "meta.user"
          ]          
        }
      }
    }
  }
]
```

#### JSON Structure with Expressions

All value strings within Property Mapping JSON are treated as [expressions]({{site.baseUrl}}/board_workspace/Expressions.html).
This allows you to write complex structures in JSON and keep the expressions itself short and simple.

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "record": {
        "event": "Post Published",
        "mapping": {
          "postId": "uuid()",
          "title": "command.title",
          "content": "command.content",
          // Nested structure is possible, too
          "authorInfo": {
            "name": "meta.user.displayName",
            "email": "meta.user.email"
          },
          // as well as arrays, 
          // whereby string items are treated as expressions again
          "tags": [
            "command.mainCategory",
            "command.subCategory"
          ],
          // and finally array of objects
          "links": [
            {
              "href": "command.previousPost.link",
              "title": "command.previousPost.title"
            },
            {
              "href": "command.nextPost.link",
              "title": "command.nextPost.title"
            }
          ]
        }
      }
    }
  }
]
```












