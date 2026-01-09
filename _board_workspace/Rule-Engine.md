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

You can enable [syntax highlighting]({{site.baseUrl}}/board_workspace/Expressions.html#syntax-highlighting) for Jexl Expressions by starting an expression with: `$>`.
{: .alert .alert-info}

Please note: all examples on this page use the expression marker, but syntax highlighting does not work in the documentation (yet).
{: .alert .alert-warning}

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

### Comments

Unlike normal JSON, you can use comments within the JSON defined on prooph board. Comments get removed when prooph board passes JSON to Cody, but they are kept on the prooph board side.

#### Line Comments

```js
[
  {
    "rule": "always",
    "then": {
      // This is a line comment
    }
  }
]
```

#### Block Comments

```js
[
  {
    "rule": "always",
    "then": {
      /*
      * This is a block comment
      */
    }
  }
]
```


### Then

The `then` part of a rule contains the actual processing logic. An `else` part of a conditional rule is similar to `then` and describes an alternative processing logic if the condition is not met.

Here is an example of a log msg rule that is always executed:

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "log": {
        // Please note: msg is a Jexl Expression, if we want to log a string, 
        // we have to enclose it in single qoutes
        "msg": "$> 'Hello from Cody Rule Engine'"
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

- [count information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#count-information)
- [find information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-information)
- [find information by id]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-information-by-id)
- [find one information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-one-information)
- [find partial information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-partial-information)
- [find one partial information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-one-partial-information)
- [find partial information by id]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-partial-information-by-id)
- [lookup user]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup-user)
- [lookup users]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup-users)

### CUD Information Rules

Allowed in [business rules](({{site.baseUrl}}/board_workspace/Rule-Engine.html#business-rules)), [processor](({{site.baseUrl}}/board_workspace/Rule-Engine.html#processor-rules)) and [projector](({{site.baseUrl}}/board_workspace/Rule-Engine.html#projector-rules)) scopes.

- [insert information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#insert-information)
- [upsert information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#upsert-information)
- [update information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#update-information)
- [replace information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#replace-information)
- [delete information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#delete-information)

Create, update, and delete information is supported in business rules and processors, but you should use it with caution.
In an event sourced system, all state changes should be captured by events. If you change information outside a projector,
you're going to change it without recording an event. Do this only if the design explicitly requires it, e.g. in case a processor maintains its own state.
{: .alert .alert-warning}


### Business Rules

[Commands]({{site.baseUrl}}/event_storming/basic-concepts.html#command) trigger business rules. The outcome of a processed command
is recorded as an event and stored in the event store (@TODO: add link). Business rules should protect invariants by checking the
current state of the system against the desired change represented by the command.

If you use [Aggregate]({{site.baseUrl}}/event_storming/basic-concepts.html#aggregate){: .alert-link} cards, business rules are defined on those cards, otherwise they are defined
directly on [Command]({{site.baseUrl}}/event_storming/basic-concepts.html#command){: .alert-link} cards. Event Modeling does not specify aggregates and encourages a design purely based on 
commands, events and information. Hence, prooph board can deal with both variants and gives you freedom of choice.
{: .alert .alert-info}

#### Available Rules

- [record event]({{site.baseUrl}}/board_workspace/Rule-Engine.html#record-event)
- [call service]({{site.baseUrl}}/board_workspace/Rule-Engine.html#call-service)
- [information lookup rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#information-lookup-rules)
- [CUD information rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#cud-information-rules)

#### Jexl Context

- `command`: data of the command
- `meta`: metadata of the command (incl. current `user`)
- `information`: current state of the aggregate, only set in aggregate business rules
- [Command Dependencies]({{site.baseUrl}}/board_workspace/Rule-Engine.html#dependencies)

#### Examples

Default rule, that records a "Room Booked" event with the data of the command:

```js
const rules = [
  {
    "rule": "always",
    "then": {
      "record": {
        "event": "Room Booked",
        "mapping": "$> command"
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
          "roomId": "$> command.roomId",
          "reason": "$> 'Room is already booked at: ' + command.day"
        }
      }
    },
    "else": {
      "record": {
        "event": "Room Booked",
        "mapping": "$> command"
      }
    }
  }
]
```

### Event Apply Rules

When working with event sourced [aggregates]({{site.baseUrl}}/event_storming/basic-concepts.html#aggregate), each aggregate event is applied to the aggregate state.

#### Available Rules

- [assign variable]({{site.baseUrl}}/board_workspace/Rule-Engine.html#assign-variable)

Only assign variable rules are allowed in the event apply scope. Once an event is recorded, applying it to the aggregate state should never fail due to side effects like calling a service or fetching information.
Event apply rules are similar to pure functions in functional programming.
{: .alert .alert-warning}

#### Jexl Context

- `event`: data of the event
- `meta`: metadata of the event (incl. `user` who originally triggered the causing command)
- `information`: current state of the aggregate

#### Example

Let's continue the "Room Booked" example from the [Business Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#business-rules).
After the event is recorded, it gets applied to the aggregate state of the `room`:

```js
// Apply "Room Booked" context, automatically provided by Cody
const ctx = {
  event: roomBooked.payload,
  meta: roomBooked.meta,
  // Current aggregate state is registered as "information" in the appy context
  information: room
}

const applyEventConfig = {
  rules: [
    {
      "rule": "always",
      "then": {
        "assign": {
          // We want to apply the event to the aggregate state
          // so we (re)assign the variable "information"
          "variable": "information",
          "mapping": {
            // First, take all current information
            "$merge": "$> information",
            // Second, apply the event
            // in this case add a new day booking
            "bookedAt": "$> information.bookedAt|push(event.day)"
          }
        }
      }
    }
  ]
}

RuleEngine.execSync(applyEventConfig.rules, ctx);

const newAggregateState = ctx.information;
```

### Processor Rules

[Processors/Policies]({{site.baseUrl}}/event_storming/basic-concepts.html#policy) perform automated workflow steps as reactions to events.
This can either be a [Service Call]({{site.baseUrl}}/board_workspace/Rule-Engine.html#call-service) or a [Command Trigger]({{site.baseUrl}}/board_workspace/Rule-Engine.html#trigger-command).

@TODO: add explanation how event todo lists work in Cody Engine/Play.

#### Available Rules

- [trigger command]({{site.baseUrl}}/board_workspace/Rule-Engine.html#trigger-command)
- [call service]({{site.baseUrl}}/board_workspace/Rule-Engine.html#call-service)
- [information lookup rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#information-lookup-rules)
- [CUD information rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#cud-information-rules)

#### Jexl Context

- `event`: data of the event that the processor is reacting to
- `meta`: metadata of the event (incl. `user` who originally triggered the causing command)
- [Processor Dependencies]({{site.baseUrl}}/board_workspace/Rule-Engine.html#dependencies)

#### Example

Let's continue the "Room Booked" example from the [Business Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#business-rules).
Once an event is recorded, we can automatically trigger reactions like sending an email. In our example, an email confirmation could be sent to the user who has booked the room.

Please note: An EmailService like it is used in the example is not yet available by default. You have to provide a custom email service to Cody Engine. We've planned to provide a standard email service,
and a way to simulate emails in Cody Play. Stay tuned!
{: .alert .alert-warning}

```js
// Processor execution context automatically provided by Cody
const ctx = {
  event: roomBooked.payload,
  meta: roomBooked.meta,
  // Email Service and room information are configured as dependencies
  // so Cody injects them into the processor execution context
  EmailService: dependencies.emailService,
  room: dependencies.room
}

const processorConfig = {
  rules: [
    {
      "rule": "always",
      "then": {
        "call": {
          // Service dependency name as registered in the context
          "service": "EmailService",
          // the EmailSerivce provides a way to use email templates
          "method": "sendFromTemplate",
          "arguments": [
            // Template name
            "$> 'RoomBookedConfirmation'",
            // Template data
            {
              // The user who booked the room is available in the event metadata
              "username": "$> meta.user.displayName",
              "roomId": "$> event.roomId",
              "roomName": "$> room.name"
            },
            // To address
            "meta.user.email"
          ],
          "async": true,
          "result": {
            "variable": "emailSentReport"
          }
        }
      }
    },
    {
      "rule": "condition",
      "if_not": "$> emailSentReport.success",
      "then": {
        // A thrown error will trigger a retry
        "throw": {
          "error": "$> 'Failed to send email: ' + emailSentReport.error"
        }
      }
    }
  ]
}
await RuleEngine.exec(processorConfig.rules, ctx);
```

### Resolver Rules

Resolver rules are executed for queries. They should provide `information` for the frontend or another service.

The information can be loaded from the document store (@TODO: add link) via [Find * Infomration rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-information)
or from a [service]({{site.baseUrl}}/board_workspace/Rule-Engine.html#call-service).

The information schema is defined by the schema of the [information card]({{site.baseUrl}}/event_storming/basic-concepts.html#information){: .alert-link}.
Cody Engine validates the information data against that schema to avoid silly bugs caused by typos or invalid states.
{: .alert .alert-warning}

#### Where Shortcut

In the advanced settings of [information cards]({{site.baseUrl}}/event_storming/basic-concepts.html#information) you can define if an information
is stored in the database or aggregated on-the-fly by the resolver. If it is stored in the database, you can use a `where` rule, which is basically a shortcut
for a [Find Information rule]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-information) (if information schema is of type array) or a [Find One Information rule]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-one-information)
(if information schema is of type object).

```js
// Let's assume a collection of persons where each person structure looks like:
const persons = [{
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
}, /* ... */]

// A resolver config for an "Adults" information could look like this
const resolverConfig = {
  // rules are optional and can be executed
  // before the document store query is made
  // rules and where share the same execution context
  // so you can use rules, to prepare the query
  "rules": [/* ... */],
  "where": {
    "rule": "always",
    "then": {
      // You can only use "filter" in where rules, the rest is handled by Cody
      "filter": {
        "gte": {
          "prop": "age",
          "value": "$> 18"
        }
      }
    }
  },
  // Order by is optional
  "orderBy": [
    {"prop": "name", "sort": "asc"}
  ]
}

// Or if we have a more generic "Persons" information
// with a flag in the "GetPersons" query to only fetch adults
// the resolver config could look like this:
const conditionalResolverConfig = {
  "where": {
    "rule": "condition",
    "if": "$> query.onlyAdults",
    "then": {
      "filter": {
        "gte": {
          "prop": "age",
          "value": "$> 18"
        }
      }
    },
    "else": {
      "filter": {
        "any": true
      }
    }
  }
}
```

#### Not Stored Information Resolver

The where shortcut documented above works for "stored in the database" information.
If the resolver should return a not stored information, for example a subset of stored information fetched via a
[Find * Partial Information rule]({{site.baseUrl}}/board_workspace/Rule-Engine.html#find-partial-information), 
you have to use `rules` exclusively and [assign]({{site.baseUrl}}/board_workspace/Rule-Engine.html#assign-variable) data to the `information` variable in the execution context.

```typescript
// Let's take the collection of persons again:
const persons = [{
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
}, /* ... */];


// The information schema that we want to query
type AdultsList = Array<{
  name: string,
  age: number,
}>;

// A resolver config for an "AdultsList" partial information could look like this
const resolverConfig = {
  // We need to define a find partail information rule 
  // "where" and "orderBy" are not working in this context 
  "rules": [
    {
      "rule": "always",
      "then": {
        "findPartial": {
          "information": "/Crm/Person",
          "filter": {
            "gte": {
              "prop": "age",
              "value": "$> 18"
            }
          },
          "select": [
            "name",
            "age"
          ],
          "orderBy":  [
            {"prop": "name", "sort": "asc"}
          ],
          // "information" variable is the default, so the config is optional
          // but for documentation reasons it's added here
          // to stress the point that this becomes the resolver response
          "variable": "information"
        }
      }
    }
  ]
}
```

#### Available Rules

Following rules are available in the `rules` section of a resolver config:

- [call service]({{site.baseUrl}}/board_workspace/Rule-Engine.html#call-service)
- [information lookup rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#information-lookup-rules)

#### Jexl Context

- `query`: data of the query that the resolver should handle
- `meta`: metadata of the query (incl. `user` who wants to view the information)
- [Resolver Dependencies]({{site.baseUrl}}/board_workspace/Rule-Engine.html#dependencies)

### Projector Rules

An event projector is responsible for a specific set of information stored as a read model in a document store collection (@TODO: add link).

The event projector subscribes to one or more events that effect the information maintained by the projector.
{: .alert .alert-info}

```typescript
interface ProjectionConfig {
  name: string,
  live: boolean,
  cases: ProjectionConfigCase[]
}
```

- `name` should be a unique projection name
- `live` flag specifies if the projection should run in the same transaction as the event recording. This ensures consistency between the write model (events) and read model (information), but hurts write throughput. If you need to scale the write model, set this flag to `false` and run the projection in a background process.
- `cases` for each event a `case` is defined in the projector config

#### Event Projection Case

```typescript
interface ProjectionConfigCase {
  given?: Rule[],
  when: string,
  then: CudInformationRule,
}
```

- `given` [optional] set of rules that are run before the CUD Information rule is executed
- `when` specifies the event name for which this case should be executed
- `then` should be one of the available [CUD Information rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#cud-information-rules), whereby the `information` setting of the rules is omitted, because it is set automatically to the information maintained by the projector. 


#### Available Rules

In the optional `given` ruleset, you have access to:

- [call service]({{site.baseUrl}}/board_workspace/Rule-Engine.html#call-service)
- [information lookup rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#information-lookup-rules)

In the `then` configuration, you only have access to:

- [CUD information rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#cud-information-rules)

#### Jexl Context

- `event`: data of the event that the projector case is handling
- `eventCreatedAt`: Date when the event was recorded
- `meta`: metadata of the event 

Please Note: Unlike other scopes, projectors only have access to the `userId` in the event metadata by accessing `meta.user.userId`.
This is a GDPR safety net. It's recommended to keep user data in one place (the Auth Service) and fetch it on-the-fly when needed in a read model.
If you really want to include sensitive user data in a read model, you can [look up the user]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup-user){: .alert-link} in the `given` part of the projection case like illustrated in the example.
{: .alert .alert-danger}

#### Example

Let's look at the room booking example from the [Business Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#business-rules) again.
The projector maintains a "Room Booking" read model that serves a calendar view and answers queries like which room is booked for which day by whom.

```js
const projectorConfig = {
  "name": "RoomBookingView",
  "live": true,
  "cases": [
    {
      "when": "Room Booked",
      // Lookup the user who has booked the room, to include their email
      // in the read model. Please consider the warning above
      // when doing something similar
      "given": [
        {
          "rule": "always",
          "then": {
            "lookup": {
              "user": "$> meta.user.userId",
              "variable": "bookedBy"
            }
          }
        }
      ],
      "then": {
        // Please note: "information" property is set automatically
        // so it is not included in the insert rule configuration here
        "insert": {
          // Use the uuid function to generate an id for the room booking
          "id": "$> uuid()",
          // Provide the data for the room booking
          "set": {
            "room": "$> event.roomId",
            "day": "$> event.day",
            // Here we have access to the "bookedBy" variable
            // set in the "given" part when the user was looked up
            "bookedBy": "$> bookedBy.email"
          }
        }
      }
    }
  ]
}
```

### Initialize Information Rules

Over the time information stored in the database might change its structure due to new requirements.
Initialize rules allow you to "upcast" information on-the-fly, before it is validated against the current schema version.

Initialize rules are invoked each time an information is loaded from the database.
{: .alert .alert-info}

#### Available Rules

Only [assign variable rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#assign-variable) are allowed.

#### Jexl Context

- `data` contains the raw data loaded from the database. Reassign/override `data` to "upcast" it.

#### Example

Let's look at the room booking example from the [Projector Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#projector-rules) again.
A new requirement asks us to add a possibility to book a room for one or more hours instead of the whole day.

All existing room bookings are full day bookings as this was the only option so far. 
Now we need to add a new flag `fullDay` and an array `timeslots` to the room booking read model.

One option would be to reset the projection and feed all recorded "Room Booked" events into it again, of course after 
implementing the new projection logic.

The alternative to a projection reset is on-the-fly upcasting with an initialize rule:

```js
// Old example booking loaded from the database
const roomBooking = {
  room: "e15a06db-31e5-4b30-b373-ec122f8efe53",
  day: "2025-02-25",
  bookedBy: "jane@acme.local",
};

// Execution context is set by Cody
const ctx = {
  data: roomBooking,
}


const initializeInformationConfig = {
  rules: [
    {
      "rule": "condition",
      // Check if this room booking needs upcasting
      // timeslots is set for new bookings, but undefined for older bookings
      "if": "$> data|get('timeslots')|typeof('undefined')",
      "then": {
        "assign": {
          "variable": "data",
          "value": {
            // First, merge old data
            "$merge": "$> data",
            // Second, set new required properties to default values
            "fullDay": "$> true",
            "timeslots": "$> []"
          }
        }
      }
    }
  ]
}

RuleEngine.execSync(initializeInformationConfig.rules, ctx);

console.log(ctx.data);

// Room Booking now inlcudes the new properties
/*
{
  room: "e15a06db-31e5-4b30-b373-ec122f8efe53",
  day: "2025-02-25",
  bookedBy: "jane@acme.local",
  fullDay: true,
  timeslots: []
}
 */
```


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
        "value": "$> 'Have a nice day!'"
      }
    }
  },
  {
    "rule": "condition",
    // Check if it's Sunday
    "if": "$> now()|weekDay() == 0",
    "then": {
      "assign": {
        // Override variable "msg", if it's Sunday
        "variable": "msg",
        "value": "$> 'Have a nice Sunday!'"
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
            "value": "$> total + item.price"
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
                "arguments": ["$> order"]
              }
            }
          },
          {
            "rule": "always",
            "then": {
              "call": {
                "service": "Shipping",
                "method": "prepare",
                "arguments": ["$> order"]
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
        "msg": ["$> 'Failed to process order: '", "$> order"],
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
    "if_not": "$> order.submitted",
    "then": {
      "throw": {
        "error": "$> 'Failed to process order: ' + order.orderId",
      }
    }
  },
  {
    // ...
  }
]
```

### Record Event

Record an event in the event store (@TODO: add link). 

This rule is only available in [Business Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#business-rules){: .alert-link}
{: .alert .alert-warning}

```typescript
 interface ThenRecordEvent {
  record: {
    event: string;
    mapping: PropMapping;
    meta?: PropMapping;
  }
}
```

- `event` specifies the event name to be recorded. The causing command and the recorded event need to be part of the same service. Therefor, you simply specify the event name as written on the event card.
- `mapping` specifies the data of the event using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)
- `meta` [optional] specifies the metadata of the event using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping). By default, all metadata from the command is copied. If you specify metadata, it gets merged with the command metadata.

Do not store sensitive user data in events unless you have a GDPR strategy in place. By default, Cody Engine only stores the `userId` in event metadata and fetches the user from the Auth Service (@TODO: add link) again, when loading an event from the event store (@TODO: add link).
If a user makes use of the right to be forgotten, you can simply delete the user from the Auth Service and their details will be replaced with anonymous data.
{: .alert .alert-danger}

#### Example

```js
const ctx = {
  command: command.payload,
  meta: command.meta
};

const rules = [
  {
    "rule": "always",
    "then": {
      "record": {
        "event": "Wiki Page Published",
        "mapping": {
          "pageId": "$> uuid()",
          "title": "$> command.title",
          "content": "$> command.content",
          "author": "$> meta.user.userId"
        },
        "meta": {
          "tags": [
            "$> 'wiki'",
            "$> 'prooph board'"
          ]
        }
      }
    }
  }
]
```

### Call Service

You can extend the functionality of [Cody Engine]({{site.baseUrl}}/cody_engine/introduction.html) by writing your own services and calling them with this rule.

```typescript
interface ThenCallService {
  call: {
    service: string;
    arguments?: PropMapping[];
    method?: string;
    async?: boolean;
    result?: {
      variable: string;
      mapping?: PropMapping;
    }
  }
}
```

- `service` specifies the name of the service as injected in the context (via Dependency @TODO: add link)
- `arguments` [optional] specifies the list of arguments passed to the function call. Arguments are provided via [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)
- `method` [optional] Services can be plain functions or classes with methods. For the latter, you need to configure the method to be called.
- `async` [optional] specifies if the service should be called async. Defaults to `false`.
- `result.variable` [optional] defines the context variable name where the result of the service call should be stored in. If not set, the result is ignored.
- `result.mapping` [optional] Use [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping) to translate the service call result into the desired format. The result is available as variable `data` in the mapping context.

#### Example

By default, the Auth Service (@TODO: add link) is available in the service registry, and you can use it to register new or update existing users. 
This example shows how to use the call service rule to register a new user.

```js
const ctx = {
  // Assume a "Register User" command here
  command: command.payload,
  meta: command.meta,
  // Assume that AuthService is registered as command dependency
  // so it gets injected into the Business Rules execution context (by cody)
  AuthService: dependencies.AuthService
}

const rules = [
  {
    "rule": "always",
    "then": {
      "call": {
        // Depencency name of the service:
        "service": "AuthSerivce",
        // Call the register method of the AuthService
        "method": "register",
        // Pass user info as argument to AuthService.register
        "arguments": [{
          "displayName": "$> command.name",
          "email": "$> command.email",
          "roles": ["$> command.role"]
        }],
        // It's an async method
        "async": true,
        // Store new userId in the context variable "userId"
        "result": {
          "variable": "userId"
        }
      }
    }
  }
]

await RuleEngine.exec(rules, ctx);

console.log('New UserId: ', ctx.userId);

// New UserId: 7abece12-4a6e-4135-b7f3-5da8c3a6c5ea
```

### Trigger Command

This rule is only available in the [Processor scope]({{site.baseUrl}}/board_workspace/Rule-Engine.html#processor-rules). It can be used to automatically trigger a new command
without user intervention.

```typescript
interface ThenTriggerCommand {
  trigger: {
    command: string;
    mapping: PropMapping;
    meta?: PropMapping;
  }
}
```

- `command` specifies the command name to be triggered. For same service commands, it's enough to specify the command name as written on the command card.
- `mapping` specifies the data of the command using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)
- `meta` [optional] specifies the metadata of the command using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping). By default, all metadata from the event is copied. If you specify metadata, it gets merged with the event metadata.

#### Example

```js
// Processor execution context automatically provided by Cody
const ctx = {
  event: roomBooked.payload,
  meta: roomBooked.meta
}

const rules = [
  {
    "rule": "condition",
    "if": "$> event.roomServiceRequested",
    "then": {
      "trigger": {
        "command": "Schedule Room Service",
        "mapping": {
          "roomId": "$> event.roomId",
          "day": "$> event.day"
        }
      }
    }
  }
]
```

### Insert Information

Add new information.

```typescript
interface ThenInsertInformation {
  insert: {
    information: string;
    id: JexlExpression;
    set: PropMapping;
  }
}
```
- `information` specifies the namespaced information (automatically set in [projector scope]({{site.baseUrl}}/board_workspace/Rule-Engine.html#projector-rules))
- `id` to be used as document id
- `set` specifies the data using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)

### Upsert Information

Add new or replace existing information.

```typescript
interface ThenUpsertInformation {
  upsert: {
    information: string;
    id: JexlExpression;
    set: PropMapping;
  }
}
```
- `information` specifies the namespaced information (automatically set in [projector scope]({{site.baseUrl}}/board_workspace/Rule-Engine.html#projector-rules))
- `id` to be used as document id
- `set` specifies the data using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)

### Update Information

Update existing information with the given `set`. If properties already exist, they are overridden otherwise added to the information.

This rule can effect multiple information stored in the same collection depending on the `filter` condition.
{: .alert .alert-warning}

```typescript
interface ThenUpdateInformation {
  update: {
    information: string;
    filter: Filter;
    set: PropMapping;
    loadDocIntoVariable?: string;
  }
}
```

- `information` specifies the namespaced information (automatically set in [projector scope]({{site.baseUrl}}/board_workspace/Rule-Engine.html#projector-rules))
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information
- `set` specifies the data using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)
- `loadDocIntoVariable` [optional] helper for single information updates. Defines the name of the variable where the current information document should be loaded into. This is useful, if you want to perform an update based on the current information, and you need to load that information first (e.g. in a projector that processes an event). The variable becomes available in the update rule. If `filter` matches more than one information, the first match is stored in the specified variable. 

### Replace Information

Replace existing information. Similar to [Update Information]({{site.baseUrl}}/board_workspace/Rule-Engine.html#update-information), but existing information is completely replaced instead of `set` being merged.

```typescript
interface ThenReplaceInformation {
  replace: {
    information: string;
    filter: Filter;
    set: PropMapping;
    loadDocIntoVariable?: string;
  }
}
```
- `information` specifies the namespaced information (automatically set in [projector scope]({{site.baseUrl}}/board_workspace/Rule-Engine.html#projector-rules))
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information
- `set` specifies the data using [Property Mapping]({{site.baseUrl}}/board_workspace/Rule-Engine.html#property-mapping)
- `loadDocIntoVariable` [optional] helper for single information updates. Defines the name of the variable where the current information document should be loaded into. This is useful, if you want to perform an update based on the current information, and you need to load that information first (e.g. in a projector that processes an event). The variable becomes available in the update rule. If `filter` matches more than one information, the first match is stored in the specified variable.

### Delete Information

Delete information that matches the `filter`. 

This rule can effect multiple information stored in the same collection depending on the `filter` condition.
{: .alert .alert-warning}

```typescript
interface ThenDeleteInformation {
  delete: {
    information: string;
    filter: Filter;
  }
}
```

- `information` specifies the namespaced information (automatically set in [projector scope]({{site.baseUrl}}/board_workspace/Rule-Engine.html#projector-rules))
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information

### Count Information

Find stored information using a [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) and count the result set.

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
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information
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
            "value": "$> 18"
          }
        },
        "variable": "adultsCount"
      }
    }
  }
]
```

### Find Information

Find a list of stored information using a [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter).

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
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information
- `skip` is optional and can be used to select a subset of the result set skipping the given number of results
- `limit` is optional and can be used to select a subset of the result set limited by the given number
- `orderBy` is optional to [sort]({{site.baseUrl}}/board_workspace/Rule-Engine.html#sort-order) the result set
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
            "value": "$> 'Hometown'"
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
        "id": "$> 'e34a13c9-aa9e-4bad-8dae-1d0c81ddcd9f'",
        "variable": "person"
      }
    }
  }
]
```

### Find One Information

Find one information by using a [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter).
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
- `find.filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information
- `find.variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Returns

Returns a single information document. If no document is found, a `NotFoundException` is thrown by default. 

You can mark a query resolver as `allowNullReturn: true` in its corresponding information metadata to let the resolver return `null` instead of a NotFoundException.
Alternatively, you can wrap the find-one-rule in a try-catch-rule. 
{: .alert .alert-info}



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
            "value": "$> 'Jane'"
          }
        }
      },
      "variable": "person"
    }
  }
]
```

### Find Partial Information

Find a list of information by using a [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) and [Select]({{site.baseUrl}}/board_workspace/Rule-Engine.html#partial-select) a subset of the information.
Partial queries also support [Lookup]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup) of additional information aka. joining related information.

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
- `select` specifies the properties to be [selected]({{site.baseUrl}}/board_workspace/Rule-Engine.html#partial-select) for the result and optional [Lookups]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup)
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information
- `skip` is optional and can be used to select a subset of the result set skipping the given number of results
- `limit` is optional and can be used to select a subset of the result set limited by the given number
- `orderBy` is optional to [sort]({{site.baseUrl}}/board_workspace/Rule-Engine.html#sort-order) the result set
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

Find one information by using a [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) and [Select]({{site.baseUrl}}/board_workspace/Rule-Engine.html#partial-select) a subset of the information.
Partial queries also support [Lookup]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup) of additional information aka. joining related information.

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
- `select` specifies the properties to be [selected]({{site.baseUrl}}/board_workspace/Rule-Engine.html#partial-select) for the result and optional [Lookups]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup)
- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against information
- `variable` is optional and defines the context name where the result is stored. If not set, result is stored in the context variable `information`

#### Returns

Returns a single partial information document. If no document is found, a `NotFoundException` is thrown by default.

You can mark a query resolver as `allowNullReturn: true` in its corresponding information metadata to let the resolver return `null` instead of a NotFoundException.
Alternatively, you can wrap the find-one-partial-rule in a try-catch-rule.
{: .alert .alert-info}

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
          "docId": "$> '25a1eeb1-928e-4772-9943-3f304ee37f64'"
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

Find one information by id and [Select]({{site.baseUrl}}/board_workspace/Rule-Engine.html#partial-select) a subset of the information.
Partial queries also support [Lookup]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup) of additional information aka. joining related information.

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
- `select` specifies the properties to be [selected]({{site.baseUrl}}/board_workspace/Rule-Engine.html#partial-select) for the result and optional [Lookups]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup)
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
        "id": "$> '25a1eeb1-928e-4772-9943-3f304ee37f64'",
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
        "user": "$> 'cce0e57f-5703-4ad4-9137-ab2cf1af80ab'"
      }
    } 
  }
]
```

### Lookup Users

Lookup a list of users using a [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter).

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

- `filter` defines the [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter) to be matched against users
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
                  "value": "$> 'Admin'"
                }
              },
              {
                // Use equal filter to lookup users by attribute
                "eq": {
                  "prop": "attributes.company",
                  "value": "$> 'Acme AG'"
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

## Filter

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
    "value": "$> 'Hometown'"
  }
}
```

### Any Filter

Find information without a specific filter.

```typescript
interface AnyFilter {
  any: boolean
}

const filter: AnyFilter = {
  "any": true
}
```

### Any Of DocId Filter

Filter information by a list of document ids.

```typescript
interface AnyOfDocIdFilter {
  anyOfDocId: JexlExpression;
}

const filter: AnyOfDocIdFilter = {
  "anyOfDocId": "['b8474c07-22b2-43f0-b274-36c3dff83335', /* ... */]"
}
```

### Any Of Filter

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
    "valueList": "$> ['Hometown', 'Big City']"   
  }
}
```

### DocId Filter

Find information by its document id.

```typescript
interface DocIdFilter {
  docId: JexlExpression;
}

const filter: DocIdFilter = {
  "docId": "$> 'b8474c07-22b2-43f0-b274-36c3dff83335'"
}
```

### Equal Filter

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
    "value": "$> 'Hometown'"
  }
}
```

### Exists Filter

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

### Greater Than or Equal Filter

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
    "value": "$> 35"
  }
}
```

### Greater Than Filter

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
    "value": "$> 35"
  }
}
```

### InArray Filter

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
    "value": "$> 'hiking'"
  }
}
```

### Like Filter

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
    "value": "$> 'Home%'"
  }
}
```

### Lower Than or Equal Filter

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
    "value": "$> 35"
  }
}
```

### Lower Than Filter

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
    "value": "$> 35"
  }
}
```

### And Filter

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
        "value": "$> 35"
      }
    },
    {
      "eq": {
        "prop": "address.city",
        "value": "$> 'Hometown'"
      }
    }
  ]
}
```

### Or Filter

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
        "value": "$> 'Hometown'"
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

### Not Filter

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
      "value": "$> 'Hometown'"
    }
  }
}
```

## Sort Order

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

## Partial Select

Define the list of properties to be included in the result.

```typescript
type FieldName = string;
type AliasFieldNameMapping = {field: string; alias: string;};
type PartialSelect = Array<FieldName|AliasFieldNameMapping|Lookup>;
```

`PartialSelect` is of type array and supports 3 different formats:

1. A simple string specifies a property name to be included as-is.
2. An object of `{field: string; alias: string;}` mapping, allows you to select a property under a different name in the result. `field` can also be a dot separated path to a nested property.
3. A [Lookup]({{site.baseUrl}}/board_workspace/Rule-Engine.html#lookup) of a one-to-one relation.

## Lookup

Lookup additional information and include it in the main [Select]({{site.baseUrl}}/board_workspace/Rule-Engine.html#partial-select).

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
- `on` defines the matching condition for the lookup. `localKey` needs to be equal to `foreignKey` (defaults to foreign document id). You can define additional matching conditions using a [Filter]({{site.baseUrl}}/board_workspace/Rule-Engine.html#filter)
- `select` defines which properties of the looked up information should be included in the result 

### Lookup Examples

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

## Property Mapping

Set complex data structures using Jexl-flavoured JSON.

Most examples across this section demonstrate the functionality of Property Mapping (PropMapping) using [Record Event]({{site.baseUrl}}/board_workspace/Rule-Engine.html#record-event){: .alert-link}
rules, but it works in other rules as well. Check the specific rule sections for details.
{: .alert .alert-info}

### Map an entire object

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
        "mapping": "$> command"
      }
    }
  }
]

await ruleEngine.exec(rules, ctx);
```

### Merge

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
          "$merge": "$> command",
          // + set an additional property
          "publishedAt": "$> now()"
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
            "$> command",
            // Second, merge all user data
            "$> meta.user"
          ]          
        }
      }
    }
  }
]
```

### JSON Structure with Expressions

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
          "postId": "$> uuid()",
          "title": "$> command.title",
          "content": "$> command.content",
          // Nested structure is possible, too
          "authorInfo": {
            "name": "$> meta.user.displayName",
            "email": "$> meta.user.email"
          },
          // as well as arrays, 
          // whereby string items are treated as expressions again
          "tags": [
            "$> command.mainCategory",
            "$> command.subCategory"
          ],
          // and finally array of objects
          "links": [
            {
              "href": "$> command.previousPost.link",
              "title": "$> command.previousPost.title"
            },
            {
              "href": "$> command.nextPost.link",
              "title": "$> command.nextPost.title"
            }
          ]
        }
      }
    }
  }
]
```

## Dependencies

Dependencies are added to rule execution contexts by Cody Engine/Play before rules are executed, so that you have access to them in the rules.

Dependencies can be configured for: 

- [Businness Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#business-rules)
- [Processor Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#processor-rules)
- [Resolver Rules]({{site.baseUrl}}/board_workspace/Rule-Engine.html#resolver-rules)

```typescript
interface Dependency {
  type: "query" | "service" | "events",
  options?: Record<string, any>,
  alias?: string,
  if?: JexlExpression,
}
```

- `type` specifies the type of the dependency. The type is important for Cody to be able to provide the dependency correctly.
- `options` [optional] depending on the `type` different options are available
- `alias` [optional] by default, the dependency name is used as variable name in the rules execution context. `alias` allows you to use a different variable name, e.g. to avoid naming conflicts.
- `if` [optional] [Expression]({{site.baseUrl}}/board_workspace/Expressions.html) to let Cody provide the dependency only if the expression returns `true`. This is especially useful for query dependencies where the query might fail when query parameters cannot always be provided. A failed query dependency would prevent rules to be executed, whereas a conditional dependency just results in an `undefined` variable in the execution context, so you can deal with that situation yourself in a conditional rule.

Dependencies are configured in a registry-like config:

```typescript
type DependencyRegistryConfig = {
  [dependencyName: string]: Dependency | Dependency[]
}
```

- `dependencyName` becomes the variable name in the rules execution context unless an `alias` is configured for the dependency
- you can configure a list of dependencies for a single `dependencyName`. In that case, each `Dependency` should have an `alias` defined to avoid naming conflicts. A list might be needed for query dependencies, where you want to execute the same query multiple times with different query parameters to make different results of the same query available in the rules execution context.

### Query Dependency

@TODO: describe config

### Service Dependency

@TODO: describe config

### Events Dependency

@TODO: describe config
