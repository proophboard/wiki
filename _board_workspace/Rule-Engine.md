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
    "if": "...", // Define condition as a Jexl expression that returns true or a falsy value
    "then": {
      // then block is executed when condition is true
    },
    "else": {
      // else block is executed when condition is falsy
    }
  },
  {
    "rule": "condition",
    "if_not": "...", // Define condition as a Jexl expression that returns true or a falsy value
    "then": {
      // then block is executed when condition is NOT true
    },
    "else": {
      // else block is executed when condition is true
    }
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
        // Please note: msg is a Jexl Expression, if we want to log a string msg, we have to enclose it in single qoutes
        "msg": "'Hello from Cody Rule Engine'"
      }
    }
  }
]
```

## Scopes

The rule engine is used in different parts of the system. A scope defines which rules are allowed, for example you can only record events in a command handling scope aka. Business Rules.

### Allowed in all scopes

- assign variable
- forEach
- execute rules
- log msg
- throw error

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

When working with event sourced aggregates (@TODO: add link), each aggregate event is applied to the aggregate state.

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




