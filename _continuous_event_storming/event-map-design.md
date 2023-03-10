---
layout: default
title: Event Map Design
toc_order: 03
---

This page provides a step-by-step guide of how to design an event-driven system using Continuous Event Storming. The resulting artifact is 
called **Event Map**. 

Throughout the guide we'll use an example from a car rental business. Code snippets are taken from a NodeJS + TypeScript application, but 
of course all concepts can be ported to any programming language or technology stack.
{: .alert .alert-info}

## Start from an Idea

Let's assume we are a startup team that wants to develop a new car rental SaaS from scratch. We just finished our 
[Big Picture Event Storming]({{site.baseurl}}/event_storming/big_picture) and now want to get our hands dirty with some product development.

The first module of our new SaaS should be some kind of **Fleet Management**. We need to be able to **Add a Car** to our fleet
and **Create a Rental Offer** for it so that it can be **booked by customers**.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/FM_First_Features.png" data-lightbox="fm_first_features" data-title="FleetManagement First Features">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/FM_First_Features.png" />
</a>

Right now, we are in our first [Design-Level Event Storming session]({{site.baseurl}}/continuous_event_storming/how-to.html#solution-space).
We should look at each event from above and think of it as a feature of the new system.

## Where - Identify the Entry Point

In the early version of our SaaS, adding a car will be a manual task. Later we want to add batch imports and derive car details 
from a third-party service, but for now we keep things simple since we want to have a fast feedback loop.

So we start with a [UI Card]({{site.baseUrl}}/event_storming/basic-concepts.html#ui--api) to sketch a rough idea of a UI screen showing a list of cars in the fleet
and a button to add a new car.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Add_Car.png" data-lightbox="fleet_overview_add_car" data-title="Fleet Overview Add Car">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Add_Car.png" />
</a>

Instead of using UI cards, some teams prefer a more visual approach by uploading screenshots from wireframes or prototypes (especially when UX is part of the team).
That's totally fine. The only advice is that those wireframes should not be too detailed as this can become a bottleneck in the flow.
{: .alert .alert-info}

## Who - Identify the Actor

Each feature should have a User Story associated to it and for this you need an Actor (aka. Role or Persona).

```
As a Fleet Manager
I want to add a car to the fleet
so that it can be booked later.
```

Each UI card should be accompanied by an [Actor Card]({{site.baseUrl}}/event_storming/basic-concepts.html#actor).

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Actor.png" data-lightbox="fo_actor" data-title="Fleet Overview Actor">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Actor.png" />
</a>

## What - Identify the Intention

The Fleet Manager wants to **add a car** to the fleet. Adding a car is their intention, and they can tell the system about it by triggering a command.
Let's put a [Command Card]({{site.baseUrl}}/event_storming/basic-concepts.html#command) between UI and event to make that clear.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Add_Car_Command.png" data-lightbox="add_car_command" data-title="Add Car Command">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Add_Car_Command.png" />
</a>

## Input - Which Information

As a next step we should define which information is needed for the command to be accepted by the system. In a collaboration session
the best way to do that is by using an [Information Card]({{site.baseUrl}}/event_storming/basic-concepts.html#information) per field or property. This allows 
all participants to contribute by adding cards in parallel.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Add_Car_Input.png" data-lightbox="add_car_input" data-title="Add Car Input">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Add_Car_Input.png" />
</a>

After a collaboration session you might want to clean up the Event Map and move such information into [Card Metadata]({{site.baseUrl}}/board_workspace/Metadata.html)[Card Metadata]({{site.baseUrl}}/board_workspace/Metadata.html){: .alert-link}
{: .alert .alert-warning}

## How - Command Handling

Some object or function in the system needs to handle the command. And for each one you should ask:
**Do we need to check some rules when handling the command?** If the question is answered with yes, write down the rules
on an [Aggregate Card]({{site.baseUrl}}/event_storming/basic-concepts.html#aggregate). 

We work with Event Sourcing in our system and record all events in event streams. 
Each stream is represented by an aggregate. So even thought we don't need to check specific rules for this command, we
write down the name of the aggregate to know in which stream the **Car Added** event will be recorded.
{: .alert .alert-info}

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Car_Aggregate.png" data-lightbox="car_aggregate" data-title="Fleet Overview Car Aggregate">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Car_Aggregate.png" />
</a>

Please note: Input or command validation is usually not defined as a business rule nor are validation errors visualized on the Event Map, because that's implementation detail. 
Anyway, we recommend using a two-step validation process. Command input should already be validated in the UI (if possible) so that the user gets direct feedback on missing or wrong information. 
The backend system should validate command input again when receiving the command and before handing it over to an aggregate or handling function. 
[JSON Schema](https://json-schema.org/){: .alert-link} works pretty good to share validation rules between frontend and backend, but of course you should
use the validation engine that is best supported by your tech stack. 
{: .alert .alert-warning}

## Output - How does State change

Handling a command usually results in some changed state in the system. The state change is represented by an [Event Card]({{site.baseUrl}}/event_storming/basic-concepts.html#domain-event)
(like **Car Added** here) and the new/changed state (or the new/changed information) can be visualized by using an [Information Card]({{site.baseUrl}}/event_storming/basic-concepts.html#information) again.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Output.png" data-lightbox="fo_output" data-title="Fleet Overview Output">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Output.png" />
</a>

## One Feature at a Time

As a last step, we should put our designed action into a [Feature Frame]({{site.baseUrl}}/board_workspace/Frames.html#feature-frame) and mark the feature as planned.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Add_Car_Feature_Frame.gif" data-lightbox="add_car_feature_frame" data-title="Add Car Feature Frame">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Add_Car_Feature_Frame.gif" />
</a>

We put features along an imaginary timeline from left to right just like we do with events in a Big Picture Event Storming. You might have noticed that the Cards within a feature are ordered
from top to bottom: **UI > Command > Aggregate > Event**. This illustrates a specific point in time. An actor makes a decision to change some state in the system based on the information visible
on the screen. The decision is followed by a command and now the system can either accept it -> process it -> record an event, or it simply rejects the command so nothing happens.
{: .alert .alert-info}

Each feature should only contain one action (Command > Aggregate > Event) not more. This ensures, that the system as a whole is composed of small, simple building blocks.
Connect the features through events and/or steps in the UI. If you strictly follow this rule and learn how to design a system in such a way, you'll notice after some time that your code 
is very clean and easy to understand. Refactorings become a no-brainer. You can add new features as reactions to existing events. You can replace or remove features. And you can do this for years
without increasing complexity. Sure, your system becomes larger, but zoomed-in to a single feature it will still be as simple as the one we just designed.
The Event Map will help you navigate through the system and keep an overview. So make sure that it stays in sync with the implementation.
{: .alert .alert-warning}

## Story Writing

Now that we have designed a feature on prooph board, it's time to derive development tasks from it. This highly depends on your workflow and tool being used.
We use a Github issue here as an example, but this could also be a User Story in Jira or similar.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Add_Car_Issue.png" data-lightbox="add_car_issue" data-title="Add Car Issue">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Add_Car_Issue.png" />
</a>

Here is our recommended issue template:

| Section           | Description                                                                   |
|-------------------|-------------------------------------------------------------------------------|
| Title             | Feature Name                                                                  |
| User Story        | Derive from Actor + Command                                                   |
| Image             | Make a screenshot of the feature on proooph board -> paste in issue           |
| Link to Event Map | Right click on prooph board feature -> choose "Direct Link" -> paste in issue |
| Sub Tasks         | Split design and development work into small chunks                           |

With some routine you can create issues using this template in less than a minute. Compare this to your normal story writing and task breakdown sessions!
{: .alert .alert-success}
