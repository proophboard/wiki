---
layout: default
title: ... on prooph board
headline: Event Modeling on prooph board
toc_order: 04
---

This page provides a step-by-step guide of how to design an event-driven system using [Event Modeling on prooph board]({{site.baseUrl}}/event_modeling/why-event-modeling). The resulting artifact is 
called **Event Map**. 

Throughout the guide we'll use an example from a car rental business.
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

Right now, we are in our first [Event Modeling Design session]({{site.baseurl}}/event_modeling/how-to.html#phase-ii-event-modeling-design).
We should look at each event from above and think of it as a [Slice]({{site.baseUrl}}/board_workspace/Frames.html#event-modeling-slice) of the new system.

## Where - Identify the Entry Point

In the early version of our SaaS, adding a car will be a manual task. Later we want to add batch imports and derive car details 
from a third-party service, but for now we keep things simple since we want to have a fast feedback loop.

So we start with a [UI Card]({{site.baseUrl}}/event_storming/basic-concepts.html#ui--api) to sketch a rough idea of a UI screen showing a list of cars in the fleet
and a button to add a new car.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Add_Car.png" data-lightbox="fleet_overview_add_car" data-title="Fleet Overview Add Car">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Fleet_Overview_Add_Car.png" />
</a>

Instead of using UI cards, some teams prefer a more visual approach by uploading screenshots from wireframes (especially when UX is part of the team).
That's totally fine. The only advice is that those wireframes should not be too detailed as this can become a bottleneck in the flow.
{: .alert .alert-info}

## Who - Identify the Actor

A [Slice]({{site.baseUrl}}/board_workspace/Frames.html#event-modeling-slice) either represents an action that a user can perform in the system or an automated process step. 
You can associate a story to it and for this you need an Actor (aka. Role or Persona).

```
As a Fleet Manager
I want to add a car to the fleet
so that it can be booked later.
```

Pull a new Slice from the sidebar. Each Slice has one or more user lanes with an [Actor Card]({{site.baseUrl}}/event_storming/basic-concepts.html#actor) as a label. Either change the existing Actor or add another lane, then put the UI card into the corresponding lane.

<a href="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-actor-lane.png" data-lightbox="fo_actor" data-title="Fleet Overview Actor">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-actor-lane.png" />
</a>

## What - Identify the Intention

The Fleet Manager wants to **add a car** to the fleet. Adding a car is their intention, and they can tell the system about it by triggering a command.
Let's put a [Command Card]({{site.baseUrl}}/event_storming/basic-concepts.html#command) into the API lane of the Slice. 
When the system accepts and processes the command an event occurs, so we also move the **Car Added** [Event Card](/event_storming/basic-concepts.html#event) into the slice.
Events are placed in the module lane of the system module where they occur. In our case, this is the **Fleet Management** module.

<a href="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-add-car-command.png" data-lightbox="add_car_command" data-title="Add Car Command">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-add-car-command.png" />
</a>

## Input - Which Information

As a next step we should define which information is needed for the command to be accepted by the system. In a collaboration session
the best way to do that is by using an [Information Card]({{site.baseUrl}}/event_storming/basic-concepts.html#information) per field or property. This allows 
all participants to contribute by adding cards in parallel.

<a href="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-add-car-input.png" data-lightbox="add_car_input" data-title="Add Car Input">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-add-car-input.png" />
</a>

After a collaboration session you might want to clean up the Event Map and structure such information in the [Card Metadata]({{site.baseUrl}}/board_workspace/Metadata.html){: .alert-link}
{: .alert .alert-warning}

## How - Command Handling

Some service or function in the system needs to handle the command. And for each one you should ask:
**Do we need to check some rules when handling the command?** If the question is answered with yes, write down the rules
on a [Business Rules Card]({{site.baseUrl}}/event_storming/basic-concepts.html#aggregate) and place it between command and event in the same module lane as the event. 

<a href="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-add-car-rules.png" data-lightbox="car_business_rules" data-title="Fleet Overview Car Business Rules">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-add-car-rules.png" />
</a>

## Output - How does State change

Handling a command usually results in some changed state in the system. The state change is represented by an [Event Card]({{site.baseUrl}}/event_storming/basic-concepts.html#domain-event)
(like **Car Added** here) and the new/changed state (or the new/changed information) can be visualized by using an [Information Card]({{site.baseUrl}}/event_storming/basic-concepts.html#information) again.

<a href="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-state.png" data-lightbox="fo_state" data-title="Fleet Overview State">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/fleet-overview-state.png" />
</a>

## One Slice at a Time

As a last step, we should mark the Slice as planned.

<a href="{{site.baseurl}}/assets/images/event-modeling/slice-planned.gif" data-lightbox="mark_as_planned" data-title="Mark as Planned">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/slice-planned.gif" />
</a>


We put Slices along an imaginary timeline from left to right just like we do with events in a Big Picture Event Storming. You might have noticed that the Cards within a Slice are ordered
from top to bottom: **UI > Command > Business Rules > Event**. This illustrates a specific point in time.
{: .alert .alert-info}

Each Slice should only contain one action (Command > Business Rule > Event) not more. This ensures, that the system as a whole is composed of small, simple building blocks.
Connect the Slices through events and/or steps in the UI. 
{: .alert .alert-warning}

*If you strictly follow this rule and learn how to design a system in such a way, you'll notice after some time that your code 
is very clean and easy to understand. Refactorings become a no-brainer. You can add new slices as reactions to existing events. You can replace or remove slices. And you can do this for years
without increasing complexity. Sure, your system becomes larger, but zoomed-in to a single Slice it will still be as simple as the one we just designed.
The Event Map will help you navigate through the system and keep an overview. So make sure that it stays in sync with the implementation.*

## Story Writing
Story Writing is optional. In fact, you already have all the information on the board, writing it down in a ticket might be useful, but it is not strictly necessary.
{: .alert .alert-warning}

Now that we have designed a Slice on prooph board, we can easily create a ticket for it.
We use a Github issue here as an example, but this could also be a User Story in Jira or similar.

<a href="{{site.baseurl}}/assets/images/event-modeling/story-writing.png" data-lightbox="add_car_issue" data-title="Add Car Issue">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/story-writing.png" />
</a>

Here is our recommended issue template:

| Section           | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| Title             | Slice Name                                                                  |
| User Story        | Derive from Actor + Command + Event(s)                                      |
| Image             | Make a screenshot of the Slice on proooph board -> paste in issue           |
| Link to Event Map | Right click on prooph board Slice -> choose "Direct Link" -> paste in issue |
| Sub Tasks         | Split design and development work into small chunks                         |

With some routine you can create issues using this template in less than a minute. Compare this to your normal story writing and task breakdown sessions!
{: .alert .alert-success}

You can also link the prooph board Slice with the issue by choosing "**Link to Task**" from the Slice context menu:

<a href="{{site.baseurl}}/assets/images/event-modeling/link-to-task.gif" data-lightbox="link_to_task" data-title="Link to Task">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/link-to-task.gif" />
</a>

## Feature Slicing

The key for any system to be maintainable over a long period of time is composition. A complex system should be composed
of simple parts. When designing Slices around events, you can use a heuristic to keep them simple:

Too much cards in a single Slice are an alarming signal that the feature is probably too big.
{: .alert .alert-danger}

Let's have a look at the next event on our Event Map: **Car Updated**. Sounds like a simple CRUD operation, right?
But wait, what exactly do we want to update? A design session should give us some insights.

<a href="{{site.baseurl}}/assets/images/CES/EventMap/Update_Car_information.png" data-lightbox="update_car_information" data-title="Update Car Information">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/EventMap/Update_Car_information.png" />
</a>

We quickly realize that a car is going to have a lot of information assigned to it. When adding a car, we only focused on the bare minimum
information needed. The update command on the other hand should support the full set, even thought it's a lot.

We know that the Fleet Manager will update a car step by step. Not all information is available right from the beginning for example the licence plate
or the equipment list. So does it make sense to have this huge update command? Wouldn't it be better to split the command into smaller chunks and give 
the task more structure?

<a href="{{site.baseurl}}/assets/images/event-modeling/update-car-slices.png" data-lightbox="update_car_sliced_actions" data-title="Update car sliced actions">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/update-car-slices.png" />
</a>

So instead of one big update command, we now have 5 distinct commands for updating different parts of a car. Those commands can be represented as 5 tabs in the UI or a 5-step editing process.
In the backend we gain some benefits from this design:

### 1. Fine-grained events 
If we want to add more automation later, the events can act as triggers. Let's say we want to run an image optimization process whenever an image is assigned to a car. 
To add this feature, you don't need to touch existing code at all. Just implement a listener on `Image Assigned` events and call it a day!

### 2. Simple Slices 
What if we later discover that car equipment can always be changed no matter if the car is booked or not, but basic and technical information are not allowed to change? 
You can adjust the business rule for the `Set Equipment` command without any risk of introducing a bug in the other commands!

### 3. Possibility to analyse behavior 
We want to make our users happy and help them with our software as much as we can. We do have the feeling that fleet managers spent a significant amount of time maintaining
car information. To validate our assumption we can look at the events and see how often a car is updated until it is ready to be published. We can also see what information is updated last or more often than other information.
This can give us an idea how to improve the system and provide a metric to measure if our changes improve the situation or make it worse. 

## Prototyping

<a href="{{site.baseurl}}/assets/images/cody-play/cody-play-in-action.gif" data-lightbox="cody_play_in_action" data-title="A Playground for your Design">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody-play/cody-play-in-action.gif" />
</a>

The Event Map is basically a blueprint of the system. You can use [Cody Play]({{site.baseUrl}}/cody_play/a-playground-for-your-design) to translate it into a working prototype.
