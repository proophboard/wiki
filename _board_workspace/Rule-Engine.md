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

- [count information]({{site.baseUrl}}/board_workspace/rule-engine.html#count-information)
- [find information]({{site.baseUrl}}/board_workspace/rule-engine.html#find-information)
- [find information by id]({{site.baseUrl}}/board_workspace/rule-engine.html#find-information-by-id)
- [find one information]({{site.baseUrl}}/board_workspace/rule-engine.html#find-one-information)
- [find partial information]({{site.baseUrl}}/board_workspace/rule-engine.html#find-partial-information)
- [find one partial information]({{site.baseUrl}}/board_workspace/rule-engine.html#find-one-partial-information)
- [find partial information by id]({{site.baseUrl}}/board_workspace/rule-engine.html#find-partial-information-by-id)
- [lookup user]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup-user)
- [lookup users]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup-users)

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
        "value": "'Have a nice day!'"
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
        "value": "'Have a nice Sunday!'"
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

Find stored information using a [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) and count the result set.

```typescript
interface ThenCountInformation {
  count: {
    information: string;
    filter: Filter;
    variable?: string;
  }
}
```

- `information` specifies the namespaced information 
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) to be matched against information
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Example

```js
// Count all persons who are 18 or older
// and store the result in the context variable "adultsCount"
const rules = [
  {
    "rule": "always",
    "then": {
      "count": {
        "information": "/Crm/Person",
        "filter": {
          "gte": {
            "prop": "age",
            "value": "18"
          }
        },
        "variable": "adultsCount"
      }
    }
  }
]
```

### Find Information

Find a list of stored information using a [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter).

```typescript
interface ThenFindInformation {
  find: {
    information: string;
    filter: Filter;
    skip?: number;
    limit?: number;
    orderBy?: SortOrder;
    variable?: string;
  }
}
```

- `information` specifies the namespaced information
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) to be matched against information
- `skip` is optional and can be used to select a subset of the result set skipping the given number of results
- `limit` is optional and can be used to select a subset of the result set limited by the given number
- `orderBy` is optional to [sort]({{site.baseUrl}}/board_workspace/rule-engine.html#sort-order) the result set
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Example

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "find": {
        "information": "/Crm/Person",
        "filter": {
          "eq": {
            "prop": "address.city",
            "value": "'Hometown'"
          }
        },
        "skip": 0,
        "limit": 50,
        "orderBy": [
          {
            "prop": "name",
            "sort": "asc"
          }
        ],
        "variable": "hometownPeople"
      }
    }
  }
]
```

### Find Information By Id

Find one information by its id.

```typescript
interface ThenFindInformationById {
  findById: {
    information: string;
    id: JexlExpression;
    variable?: string;
  }
}
```

- `information` specifies the namespaced information
- `id` to be used for matching
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Example

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "findById": {
        "information": "/Crm/Person",
        "id": "'e34a13c9-aa9e-4bad-8dae-1d0c81ddcd9f'",
        "variable": "person"
      }
    }
  }
]
```

### Find One Information

Find one information by using a [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter).
If filter matches more than one information, the first match is used.

```typescript
interface ThenFindOneInformation {
  findOne: {
    information: string;
    filter: Filter;
    variable?: string;
  }
}
```

- `find.information` specifies the namespaced information
- `find.filter` defines the [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) to be matched against information
- `find.variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Example

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "findOne": {
        "information": "/Crm/Person",
        "filter": {
          "eq": {
            "prop": "name",
            "value": "'Jane'"
          }
        }
      },
      "variable": "person"
    }
  }
]
```

### Find Partial Information

Find a list of information by using a [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) and [Select]({{site.baseUrl}}/board_workspace/rule-engine.html#partial-select) a subset of the information.
Partial queries also support [Lookup]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup) of additional information aka. joining related information.

```typescript
interface ThenFindPartialInformation {
  findPartial: {
    information: string;
    select: PartialSelect;
    filter: Filter;
    skip?: number;
    limit?: number;
    orderBy?: SortOrder;
    variable?: string;
  }
}
```

- `information` specifies the namespaced information
- `select` specifies the properties to be [selected]({{site.baseUrl}}/board_workspace/rule-engine.html#partial-select) for the result and optional [Lookups]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup)
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) to be matched against information
- `skip` is optional and can be used to select a subset of the result set skipping the given number of results
- `limit` is optional and can be used to select a subset of the result set limited by the given number
- `orderBy` is optional to [sort]({{site.baseUrl}}/board_workspace/rule-engine.html#sort-order) the result set
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Example

```typescript
// Schema of information stored in the document store
interface Employee {
  employeeId: Uuid;
  name: string;
  team: Uuid;
}

interface Team {
  teamId: Uuid;
  name: string;
  company: Uuid;
}

interface Company {
  companyId: Uuid;
  name: string;
}

// Lookup Employees and their teams
const employeesWithTeamRules = [
  {
    "rule": "always",
    "then": {
      "findPartial": {
        "information": "/App/Employee",
        "filter": {
          "any": true
        },
        "select": [
          "employeeId",
          {
            "field": "name",
            "alias": "employeeName"
          },
          {
            "lookup": "/App/Team",
            "on": {
              "localKey": "team"
            },
            "select": [
              {
                "field": "name",
                "alias": "teamName"
              }
            ]
          }
        ]
      },      
      "variable": "employees"
    }
  }
]

/**
 * Result would look like this:
 *
 * [
 *  {
 *    employeeId: "2f0cc76b-60ca-4c95-8a92-15d0663241c9",
 *    employeeName: "Max",
 *    teamName: "Jupiter"
 *  }
 * ]
 */
```

### Find One Partial Information

Find one information by using a [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) and [Select]({{site.baseUrl}}/board_workspace/rule-engine.html#partial-select) a subset of the information.
Partial queries also support [Lookup]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup) of additional information aka. joining related information.

```typescript
interface ThenFindOnePartialInformation {
  findOnePartial: {
    information: string;
    select: PartialSelect;
    filter: Filter;
    variable?: string;
  }
}
```

- `information` specifies the namespaced information
- `select` specifies the properties to be [selected]({{site.baseUrl}}/board_workspace/rule-engine.html#partial-select) for the result and optional [Lookups]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup)
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) to be matched against information
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Example

```typescript
// Schema of information stored in the document store
interface Employee {
  employeeId: Uuid;
  name: string;
  team: Uuid;
}

interface Team {
  teamId: Uuid;
  name: string;
  company: Uuid;
}

interface Company {
  companyId: Uuid;
  name: string;
}

// Lookup Employee and their team
const employeeWithTeamRules = [
  {
    "rule": "always",
    "then": {
      "findOnePartial": {
        "information": "/App/Employee",
        "filter": {
          "docId": "'25a1eeb1-928e-4772-9943-3f304ee37f64'"
        },
        "select": [
          "employeeId",
          {
            "field": "name",
            "alias": "employeeName"
          },
          {
            "lookup": "/App/Team",
            "on": {
              "localKey": "team"
            },
            "select": [
              {
                "field": "name",
                "alias": "teamName"
              }
            ]
          }
        ]
      },      
      "variable": "employee"
    }
  }
]

/**
 * Result would look like this:
 *
 * {
 *   employeeId: "2f0cc76b-60ca-4c95-8a92-15d0663241c9",
 *   employeeName: "Max",
 *   teamName: "Jupiter"
 * }
 */
```

### Find Partial Information By Id

Find one information by id and [Select]({{site.baseUrl}}/board_workspace/rule-engine.html#partial-select) a subset of the information.
Partial queries also support [Lookup]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup) of additional information aka. joining related information.

```typescript
interface ThenFindPartialInformationById {
  findPartialById: {
    information: string;
    id: string;
    select: PartialSelect;
    variable?: string;
  }
}
```

- `information` specifies the namespaced information
- `id` to be used for matching
- `select` specifies the properties to be [selected]({{site.baseUrl}}/board_workspace/rule-engine.html#partial-select) for the result and optional [Lookups]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup)
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Example

```typescript
// Schema of information stored in the document store
interface Employee {
  employeeId: Uuid;
  name: string;
  team: Uuid;
}

interface Team {
  teamId: Uuid;
  name: string;
  company: Uuid;
}

interface Company {
  companyId: Uuid;
  name: string;
}

// Lookup Employee and their team
const employeeWithTeamRules = [
  {
    "rule": "always",
    "then": {
      "findPartialById": {
        "information": "/App/Employee",
        "id": "'25a1eeb1-928e-4772-9943-3f304ee37f64'",
        "select": [
          "employeeId",
          {
            "field": "name",
            "alias": "employeeName"
          },
          {
            "lookup": "/App/Team",
            "on": {
              "localKey": "team"
            },
            "select": [
              {
                "field": "name",
                "alias": "teamName"
              }
            ]
          }
        ]
      },      
      "variable": "employee"
    }
  }
]

/**
 * Result would look like this:
 *
 * {
 *   employeeId: "2f0cc76b-60ca-4c95-8a92-15d0663241c9",
 *   employeeName: "Max",
 *   teamName: "Jupiter"
 * }
 */
```

### Lookup User

Lookup a user by their userId.

```typescript
interface ThenLookupUser {
  lookup: {
    user: JexlExpression,
    variable?: string,
  }
}
```
- `user` specifies the userId to be used for the lookup
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `user`

#### Example

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "lookup": {
        "user": "'cce0e57f-5703-4ad4-9137-ab2cf1af80ab'"
      }
    } 
  }
]
```

### Lookup Users

Lookup a list of users using a [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter).

```typescript
interface ThenLookupUsers {
  lookup: {
    users: {
      filter: Filter,
      skip?: number;
      limit?: number;
      variable?: string;
    }
  }
}
```

- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter) to be matched against users
- `skip` is optional and can be used to select a subset of the result set skipping the given number of results
- `limit` is optional and can be used to select a subset of the result set limited by the given number
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `users`

Keycloak Auth Service only supports roles and attributes filters combined with a logical AND.
{: .alert .alert-warning}

#### Example

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "lookup": {
        "users": {
          "filter": {
            // Only logical AND filter is supported by Keycloak Auth Service
            "and": [
              {
                // Use inArray filter to lookup users of a specific role
                "inArray": {
                  "prop": "roles",
                  "value": "'Admin'"
                }
              },
              {
                // Use equal filter to lookup users by attribute
                "eq": {
                  "prop": "attributes.company",
                  "value": "'Acme AG'"
                }
              }
            ]
          }
        }
      }
    }
  }
]
```




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

### Filter

Filters are used to find stored information. Most filters check a specific information property against a value.
If information is a nested structure, and you want to filter on nested properties you can use dots to define the path.

Values are provided via [Jexl Expressions]({{site.baseUrl}}/board_workspace/Expressions.html){: .alert-link}
{: .alert .alert-info}

```js
// An example person with a nested address schema
const person = {
  name: "Jane",
  age: 35,
  address: {
    "street": "Mainstreet",
    "city": "Hometown"
  },
  hobbies: [
    "running",
    "hiking",
    "reading"
  ]
}

// If you want to find all persons living in Hometown, 
// you would use an equal filter like this:
const filter = {
  "eq": {
    "prop": "address.city",
    // Note the single qoutes insight double qoutes due to 
    // value being interpreted as a Jexl Expression
    "value": "'Hometown'"
  }
}
```

#### Any Filter

Find information without a specific filter.

```typescript
interface AnyFilter {
  any: boolean
}

const filter: AnyFilter = {
  "any": true
}
```

#### Any Of DocId Filter

Filter information by a list of document ids.

```typescript
interface AnyOfDocIdFilter {
  anyOfDocId: JexlExpression;
}

const filter: AnyOfDocIdFilter = {
  "anyOfDocId": "['b8474c07-22b2-43f0-b274-36c3dff83335', /* ... */]"
}
```

#### Any Of Filter

Find information by comparing the value of a property against a list of possible values. 

```typescript
interface AnyOfFilter {
  anyOf: {
    prop: string,
    valueList: JexlExpression,
  }
}

const filter: AnyOfFilter = {
  "anyOf": {
    "prop": "address.city",
    "valueList": "['Hometown', 'Big City']"   
  }
}
```

#### DocId Filter

Find information by its document id.

```typescript
interface DocIdFilter {
  docId: JexlExpression;
}

const filter: DocIdFilter = {
  "docId": "'b8474c07-22b2-43f0-b274-36c3dff83335'"
}
```

#### Equal Filter

Check that a property equals a specific value. 

```typescript
interface EqFilter {
  eq: {
    prop: string,
    value: JexlExpression,
  }
}

const filter: EqFilter = {
  "eq": {
    "prop": "address.city",
    "value": "'Hometown'"
  }
}
```

#### Exists Filter

Check that a specific property exists.

```typescript
interface ExistsFilter {
  exists: {
    prop: string;
  }
}

// Find all persons who have the age property set
const filter: ExistsFilter = {
  "exists": {
    "prop": "age"
  }
}
```

#### Greater Than or Equal Filter

Check that a property is greater than or equal to value.

```typescript
interface GteFilter {
  gte: {
    prop: string,
    value: JexlExpression,
  }
}

// Find all persons who are 35 or older
const filter: GteFilter = {
  "gte": {
    "prop": "age",
    "value": "35"
  }
}
```

#### Greater Than Filter

Check that a property is greater than value.

```typescript
interface GtFilter {
  gt: {
    prop: string,
    value: JexlExpression,
  }
}

// Find all persons who are older than 35
const filter: GtFilter = {
  "gt": {
    "prop": "age",
    "value": "35"
  }
}
```

#### InArray Filter

If property is of type array, check that given value is one of the items.

```typescript
interface InArrayFilter {
  inArray: {
    prop: string,
    value: JexlExpression,
  }
}

// Find all persons who have hiking as a hobby
const filter: InArrayFilter = {
  "inArray": {
    "prop": "hobbies",
    "value": "'hiking'"
  }
}
```

#### Like Filter

Match a string property against a value string that contains a wildcard: `%`
at the start and/or end.

```typescript
interface LikeFilter {
  like: {
    prop: string,
    value: JexlExpression,
  }
}

// Find all persons who live in a city that starts with "Home"
const filter: LikeFilter = {
  "like": {
    "prop": "address.city",
    "value": "'Home%'"
  }
}
```

#### Lower Than or Equal Filter

Check that a property is lower than or equal to a value.

```typescript
interface LteFilter {
  lte: {
    prop: string,
    value: JexlExpression,
  }
}

// Find all persons who are 35 or younger
const filter: LteFilter = {
  "lte": {
    "prop": "age",
    "value": "35"
  }
}
```

#### Lower Than Filter

Check that a property is lower than a value.

```typescript
interface LtFilter {
  lt: {
    prop: string,
    value: string,
  }
}

// Find all persons who are younger than 35
const filter: LtFilter = {
  "lt": {
    "prop": "age",
    "value": "35"
  }
}
```

#### And Filter

Find information where two or more filters match.

```typescript
interface AndFilter {
  and: Filter[]
}

// Find all persons who are older than 35 and live in Hometown
const filter: AndFilter = {
  "and": [
    {
      "gt": {
        "prop": "age",
        "value": "35"
      }
    },
    {
      "eq": {
        "prop": "address.city",
        "value": "'Hometown'"
      }
    }
  ]
}
```

#### Or Filter

Find information where any of the given filters match.

```typescript
interface OrFilter {
  or: Filter[]
}

// Find all persons who either live in Hometown or have no address set.
const filter: OrFilter = {
  "or": [
    {
      "eq": {
        "prop": "address.city",
        "value": "'Hometown'"
      }
    },
    {
      "not": {
        "exists": {
          "prop": "address"
        }
      }
    }
  ]
}
```

#### Not Filter

Find information where a given filter does not match.

```typescript
interface NotFilter {
  not: Filter
}

// Find all persons who don't live in Hometown
const filter: NotFilter = {
  "not": {
    "eq": {
      "prop": "address.city",
      "value": "'Hometown'"
    }
  }
}
```

### Sort Order

Defines a list of sorting instructions. Each instruction defines sorting for one property.
The result set is first sorted by the first instruction then by the next instruction and so on.

```typescript
type SortOrder = Array<{
  prop: string;
  sort: 'asc' | 'desc';
}>
```

- `SortOrder.prop` defines the property to be sorted. Can be a nested path.
- `SortOrder.sort` defines if sorting should be in ascending (smallest to largest) or descending (largest to smallest) order.

### Partial Select

Define the list of properties to be included in the result.

```typescript
type FieldName = string;
type AliasFieldNameMapping = {field: string; alias: string;};
type PartialSelect = Array<FieldName|AliasFieldNameMapping|Lookup>;
```

`PartialSelect` is of type array and supports 3 different formats:

1. A simple string specifies a property name to be included as-is.
2. An object of `{field: string; alias: string;}` mapping, allows you to select a property under a different name in the result. `field` can also be a dot separated path to a nested property.
3. A [Lookup]({{site.baseUrl}}/board_workspace/rule-engine.html#lookup) of a one-to-one relation.

### Lookup

Lookup additional information and include it in the main [Select]({{site.baseUrl}}/board_workspace/rule-engine.html#partial-select).

Cody Play/Engine only supports one-to-one relations, but not one-to-many or many-to-many. You should be careful with lookups as they 
introduce coupling. You trade less complicated projections with more coupling in the data layer. Choose wisely.
{: .alert .alert-warning}

```typescript
interface Lookup {
  lookup: string;
  alias?: string;
  using?: string;
  optional?: boolean; 
  on: {
    localKey: string;
    foreignKey?: string;
    and?: Filter;
  },
  /* 
   * If lookup is optional and foreignDoc cannot be found, 
   * non-optional select fields are returned as NULL 
   */
  select?: Array<FieldName|AliasFieldNameMapping>;
}
```

- `lookup` specifies the namespaced information to look up
- `alias` gives the lookup a name, that can be referenced in further lookups (optional)
- `using` defines the lookup to be used as the local basis. By default, the local basis is the main information specified in the find * rule, but you can also use another lookup as the local basis. 
- `optional` defines if the lookup is optional. If false (default) and referenced information cannot be found, also the main select is not included in the result set.
- `on` defines the matching condition for the lookup. `localKey` needs to be equal to `foreignKey` (defaults to foreign document id). You can define additional matching conditions using a [Filter]({{site.baseUrl}}/board_workspace/rule-engine.html#filter)
- `select` defines which properties of the looked up information should be included in the result 

#### Lookup Examples

```typescript
// Schema of information stored in the document store
interface Employee {
  employeeId: Uuid;
  name: string;
  team: Uuid;
}

interface Team {
  teamId: Uuid;
  name: string;
  company: Uuid;
}

interface Company {
  companyId: Uuid;
  name: string;
}

// Lookup Employees and their teams
const employeesWithTeamRules = [
  {
    "rule": "always",
    "then": {
      "findPartial": {
        "information": "/App/Employee",
        "filter": {
          "any": true
        },
        "select": [
          "employeeId",
          {
            "field": "name",
            "alias": "employeeName"
          },
          {
            "lookup": "/App/Team",
            "on": {
              "localKey": "team"
            },
            "select": [
              {
                "field": "name",
                "alias": "teamName"
              }
            ]
          }
        ]
      }
    }
  }
]

/**
 * Result would look like this:
 * 
 * [
 *  {
 *    employeeId: "2f0cc76b-60ca-4c95-8a92-15d0663241c9",
 *    employeeName: "Max",
 *    teamName: "Jupiter"
 *  }
 * ]
 */

// Lookup Employees, their teams and the organization
// This example shows the lookup via reference defined in another lookup
const employeesWithTeamAndCompanyRules = [
  {
    "rule": "always",
    "then": {
      "findPartial": {
        "information": "/App/Employee",
        "filter": {
          "any": true
        },
        "select": [
          "employeeId",
          {
            "field": "name",
            "alias": "employeeName"
          },
          {
            "lookup": "/App/Team",
            // This alias is referenced in the next lookup using section
            "alias": "team",
            "on": {
              "localKey": "team"
            },
            "select": [
              {
                "field": "name",
                "alias": "teamName"
              }
            ]
          },
          {
            "lookup": "/App/Company",
            // Use the team lookup as the local basis
            "using": "team",
            "on": {
              // In fact, this becomes team.company = company.companyId
              "localKey": "company",
              // Not strickly needed, as the default would by company documentId
              "foreignKey": "companyId"
            },
            "select": [
              {
                "field": "name",
                "alias": "companyName"
              }
            ]
          }
        ]
      }
    }
  }
]

/**
 * Result would look like this:
 *
 * [
 *  {
 *    employeeId: "2f0cc76b-60ca-4c95-8a92-15d0663241c9",
 *    employeeName: "Max",
 *    teamName: "Jupiter",
 *    companyName: "Acme AG"
 *  }
 * ]
 */
```







