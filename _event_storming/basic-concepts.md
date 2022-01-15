---
layout: default
title: Basic Concepts
toc_order: 02
---

:dart: The goal of Event Storming in general is to first gain an overview of the entire domain and then of all details associated with this overview needed for
specific features. Colored sticky notes are used to describe business and information flows, user system interactions and automated processes.

Event Storming defines a limited set of elements. This simplicity is a key reason for its success. The entry barrier is low so that all people can use the method without long explanations.

<a href="{{site.baseurl}}/assets/images/Event_Storming_The_Picture.png" data-lightbox="The-Picture" data-title="Event Storming - The Picture">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Event_Storming_The_Picture.png" />
</a>


*Open [The Picture](https://free.prooph-board.com/inspectio/boards/import/https%3A%2F%2Fraw.githubusercontent.com%2Fevent-engine%2Finspectio%2Fmaster%2Fassets%2FExample%2520Boards%2FThe%2520Picture.xml){: target="_blank" rel="noopener noreferrer"} in the free client*{: .small}

[prooph board's](https://prooph-board.com/){: .alert-link} primary modelling elements (called Cards) are based on Event Storming concepts. Instead of simple colored sticky notes, Cards have a type assigned.
This enables rich model analysis and conversion to source code. We'll cover that later in detail.
{: .alert .alert-info}

:bulb: *Moderator Tip: First Event Storming Session? Introduce elements step by step. Start with Domain Events and explain further colors and concepts as needed. Try to avoid too much details in a Big Picture Event Storming. Getting an overview quickly is more important at the beginning.*

## Domain Event

![Domain Event Card]({{site.baseurl}}/assets/images/Cards/Domain_Event.png){: .card .horizontal} Probably the most important element in Event Storming is the Domain Event. It represents a fact &mdash; **something that has happened**.
The corresponding color is **orange**{: .bg .event}.

You can describe every activity, data flow or process as a series of Domain Events e.g. *"User Browsed Online Shop" -> "Item Put Into Card" -> "Order Placed" -> "Order Paid" -> "Order Shipped"*.

It's this simple concept that makes Event Storming successful. A quick explanation how to formulate an Event and the Big Picture Event Storming session can start.

**Use past tense in Domain Events.** Put them in chronological order from left to write to tell a story. Ask questiosn like: What other events need to happen before this event?, Who or what causes this event? When does the event happen? ...

## Command

![Command Card]({{site.baseurl}}/assets/images/Cards/Command.png){: .card .horizontal} A command represents a decision that **something should happen**. The color code is **blue**{: .bg .command}
It can be a decision of a user e.g. who wants to *Place an Order* or *Pay an Invoice* as well as a decision based on a [Policy](#policy) or made in an [External System](#external-system).

Usually, commands are named with a verb in imperative mood, present tense - followed by subject e.g. *"Start Engine", "Buy House", "Share Picture" ...*

Commands cause events. Often, you have a 1:1 relationship between them: *Pay Order -> Order Paid, Book Room -> Room Booked*.
However, one command can cause one, multiple or no events. It depends on the [business rules](#aggregate).

## Actor

![Actor]({{site.baseurl}}/assets/images/Cards/Actor.png){: .card .vertical} Actor cards are used to highlight that users with a certain **role** are involved in a business process
or use a specific [UI](#ui) to make [decisions](#command). The color code is **lemon yellow**{: .bg .actor} and the card is in portrait.

Write the user role on the card and put it next to a UI or Command card.

![Rule UI Example]({{site.baseurl}}/assets/images/event_storming_role_ui_example.png)

## Aggregate
![Aggregate Card]({{site.baseurl}}/assets/images/Cards/Aggregate.png){: .card .horizontal} The term aggregate is borrowed from Domain-Driven Design.
In Event Storming it's basically a business rule that makes sure a [Command](#command) can be executed e.g. *An order can only be shipped if it is paid*. Write down such rules on  **sunny yellow**{: .bg .aggregate} cards
and put them between a command and one ore more events.

![Business Rule Example]({{site.baseurl}}/assets/images/event_storming_business_rule_example.png)

The card type is labeled "Aggregate" on prooph board because the domain concept connected with the term is important for detailed modelling. We'll do a deep dive in the Collaborative Modelling part of the documentation.
Writing down business rules on Aggregate Cards is a good preparation for detailed modelling sessions.
{: .alert .alert-info}

## Information

![Information Card]({{site.baseurl}}/assets/images/Cards/Information.png){: .card .horizontal} **Green**{: .bg .information} cards represent information needed to make a [decision](#command).
Information are usually displayed in a [UI](#ui), but can also be in an excel sheet, PDF document or printed out on paper. [External Systems](#external-system) fetch information via API or from a database to make decisions.
All these cases can be visualized with green Information Cards in combination with others.

<a href="{{site.baseurl}}/assets/images/event_storming_information_example.png" data-lightbox="Information-Example" data-title="Information Cards Example">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event_storming_information_example.png" />
</a>


Every information change should be described as a [Domain Event](#domain-event). **If there was no event, the information did not change!**
{: .alert .alert-warning}

Developers familiar with the architecture pattern CQRS should also know the term "Read Model". Both terms can be used interchangeably.
{: .alert .alert-info}

## Policy

![Policy Card]({{site.baseurl}}/assets/images/Cards/Policy.png){: .card .horizontal} A Policy is **a reaction to an event**. It represents automated decision and coordination logic.
Simply said: *If this, then that!*. **Lilac**{: .bg .policy} Cards are used for policies. They trigger new [commands](#command).

A good example of a process with policies involved is a reservation. Imagine a ticketing system of an airline. While booking a ticket, one can
usually select a free seat in the airplane. A resulting event could be *Seat Reserved*.  As soon as a Policy receives the final event *Flight Ticket Bought*, it can trigger a command
to change the *reserved seat* into a *booked seat*. This should happen within a fixed timeframe, let's say 15 minutes. If the potential passenger does not finish the booking process,
the Policy will trigger a command to change the seat back to *available*.

<a href="{{site.baseurl}}/assets/images/event_storming_reservation_with_policies_example.png" data-lightbox="Reservation-Policy-Example" data-title="Reservation with Policies Example">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event_storming_reservation_with_policies_example.png" />
</a>


## Hot Spot

![Hot Spot Card]({{site.baseurl}}/assets/images/Cards/Hot_Spot.png){: .card .horizontal} No Event Storming without Hot Spots. If you don't have a couple of **red**{: .bg .hot_spot} Cards on the board after a Big Picture
Event Storming, you did not dig deep enough :smirk:. Just kidding, but a Hot Spot is the swiss army knife for an Event Storming facilitator.

**Use Hot Spots when:**

*A question came up that nobody can answer right now -> Write it on a Hot Spot and put it close to the elements on the board that triggered the question.*

*A discussion between two experts becomes heated or drifts into details so that no one else can follow anymore -> Stop the discussion, write the topic on a hot spot with a note that it should be revisited in a follow up.*

*Someone points out a pain point in a process or describes something as a bottleneck -> Write it down and mark the area on the board with the Hot Spot.*

:bulb: Hot Spots are good action items to tackle after an Event Storming session.

## External System

![External System Card]({{site.baseurl}}/assets/images/Cards/External_System.png){: .card .horizontal} A third-party system involved in a business process can be visualized with a **dusky pink**{: .bg .external_system} Card.
Digitizing workflows often means connecting and orchestrating different digital services. Event Storming is a lightweight method to plan and document interactions between your system and external services.

## UI / API

![UI Card]({{site.baseurl}}/assets/images/Cards/UI.png){: .card .horizontal} The original color code for UI stickies is white, but on prooph board all cards are white with a colored top bar.
So we decided to invert the color and use **black**{: .bg .ui} for UI Cards. We also extended its meaning to include APIs. APIs as well as UIs are public interfaces.
One for humans the other one for machines. To keep the color code simple, black Cards combine both - human and machine interfaces - to a unified **Interface Card Type**.

Use icons on UI Cards to roughly sketch what is visible on the screen. Just enough to support the idea. Don't waste your time with too much details. prooph board is not a wireframe tool. UX / UI designers have
their specialised tools for this task. However, screenshots of wireframes / existing UIs are a quick and easy way to include more detailed designs in Event Storming sessions.
{: .alert .alert-info}

