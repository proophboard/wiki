---
layout: default
title: Prepare Big Picture Session
toc_order: 03
---

In this chapter you'll learn how to organize and run your first Big Picture Event Storming on [prooph board](https://prooph-board.com/).

## Plan Session(s)

Ok, you decided to organize your first Event Storming. That's great :clap:. Welcome to the club of Event Stormers. You won't regret it!
Fortunately, there is not much upfront planning needed. However, it's important to set expectations correctly and start small. A few pitfalls
should be avoided to not risk success.

Big Picture Event Storming isn't complicated. We'll provide you a simple guideline to follow and give you some tips and tricks to keep discussions running and people engaged.
But everything needs practice. Event Storming is no exception. Don't expect that it will work perfectly at first try.

Goal of the first session should be to a) get familiar with Event Storming itself and b) create a shared understanding of the domain or the area of the business that is of interest for you.
{: .alert .alert-success}

Do not define goals like: After the session we should be able to derive stories that we can work on next. Such goals often require detail sessions.
Set as a goal for a Big Picture Storming - maybe to convince a manager to spent time and money - could end up in unmet expectations and unhappy attendees or supporters.
{: .alert .alert-danger}

:busts_in_silhouette: Make sure to have a facilitator available. You need someone with Event Storming experience and moderator skills. It's possible to run out of time or end up in heated discussions, if you don't have
someone who takes care of that. We can help you find a facilitator. [Just get in touch](http://prooph-software.de/#consultancy-section){: target="_blank" rel="noopener noreferrer"}.
Once you're familiar with the method, a team member can take over the facilitator role.

:alarm_clock: Split a remote Big Picture workshop into at least two days. Each day not longer than 3 hours. Also plan enough breaks e.g. 10 min after every 50 minutes. Remote collaboration is fun but also draining! Keep that in mind.
Nice side effect is, that you can give homework after the first day. At the end of day one ask questions like: *Are the events correct?, Did we forget something?, Should we change the current structure?*.
Start day two with the same questions and see what new insights people got overnight.

## Invite The Right People

Event Storming works best if attendees represent different areas of expertise: developers, product manager, business experts, UX, decision makers, you name it. The list highly depends on context. But it's important
to stress the point that Event Storming can only unfold its full potential when not only developers do it. Otherwise you'll end up with the same problems that you likely want to solve.

6-10 people is a good number for a remote workshop. If more people want to join (or have to), you definitely need more than one facilitator. In this case plan grouping with breakout rooms in advance.

We're constantly working on improving the remote experience for larger groups on prooph board. An integrated, interactive video avatar feature is currently in beta test phase and will be rolled out soon.
It enables seamless grouping and parallel discussions on the same modeling workspace. If you would like to try it and can't wait until official release: [Contact Us](http://prooph-software.de/#contact){: .alert-link target="_blank" rel="noopener noreferrer"}
{: .alert .alert-info}

## Prepare Board Workspace

First of all you need to create a new board in prooph board. After sign in you can directly do this on the dashboard. Click "Add Board" to create a new one and give it a name.
You're redirected to the new, empty board. It's ready to be prepared for the workshop session.

:bulb: People can be invited using the "share" button in the top bar. Enter their email addresses and they'll receive an invitation.

It's not yet possible to use the free client for remote collaboration workshops. You need a paid subscription to be able to invite other people. They also have to create an account but don't need to subscribe to paid plan, too.
Learn more in [Managing an Organization]({{site.baseurl}}/access_management/Managing-an-Organization.html){: .alert-link}
{: .alert .alert-info}

For the session itself you don't need to prepare much. Include the link to the basic concepts: [https://wiki.prooph-board.com/event_storming/basic-concepts.html](https://wiki.prooph-board.com/event_storming/basic-concepts.html)
in the meeting invitation, so that people can study it upfront. Also communicate the goals and expectations of the session.

If you want to prepare some supportive areas (recommended) like an overview of the agenda or a Q&A area, you can make use of [Frames]({{site.baseurl}}/board_workspace/Frames.html). Here is an example:

<a href="{{site.baseurl}}/assets/images/big_picture_prepare_board.gif" data-lightbox="prepare-session" data-title="Prepare Session">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/big_picture_prepare_board.gif" />
</a>

Frames help you structuring the modelling space and allow for quick navigation using the [Tree View]({{site.baseurl}}/board_workspace/Tree-View.html){: .alert-link} in the left sidebar.
{: .alert .alert-info}

Ok everything is prepared. The session can start!

## Explain Basic Concepts

At the beginning of each workshop it is useful to give an introduction. *What are we going to do today? What are our goals and expectations? Who is in the room?*
Then the facilitator should quickly explain [what Event Storming is]({{site.baseurl}}/event_storming/what-is-event-storming.html) and how to work with [Domain Events]({{site.baseurl}}/event_storming/basic-concepts.html#domain-event).

It is not recommended to explain all Event Storming concepts in one go, but rather explain them as needed. It saves time and reduces cognitive load. You usually don't need all Card types in a Big Picture Event Storming anyway.
Explaining the concept of Domain Events and just start with that.
{: .alert .alert-warning}

## First Event

The first event is the most difficult to write. Everybody is still unsure what to do and how it works. But don't worry, this changes quickly.
A good starting point is to ask about the goals of the company/business unit. *What user needs do we serve? How do we make money?*

<a href="{{site.baseurl}}/assets/images/Big_Picture/First_Event.png" data-lightbox="First_Event" data-title="First Event">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Big_Picture/First_Event.png" />
</a>

## Chaotic Mode

After the first event is found (the icebreaker event), you ask every attendee to write down more events.
This happens in parallel. Everybody should ask themself questions like: *What happens before the event? What comes after? What events are important for the company and our users?*
Ordering is not important at this phase. Just brainstorm whatever comes to mind and put it somewhere. 10 - 15 minutes is a good timeframe for chaotic mode.

:bulb: Use prooph boards integrated timer to keep an eye on the clock. One can start a timer by clicking on the **hour glass** icon in the top bar. Set a time, press enter and the timer will start to tick. It is synchronized with all attendees.
So everybody can see how much time is left.

<a href="{{site.baseurl}}/assets/images/Big_Picture/Chaotic_Mode.png" data-lightbox="Chaotic_Mode" data-title="Chaotic Mode">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Big_Picture/Chaotic_Mode.png" />
</a>

## Tell a Story

Now that we have a couple of high level Domain Events on the board, it's time to order them chronologically. One person takes over the driver seat (does the ordering) and constructs a story.
Switch driver seat every 5 - 10 minutes to keep people engaged. Talking about the process (the story) will trigger discussions.
Better events are suggested, wrong or duplicate events get removed and more detailed events added.

<a href="{{site.baseurl}}/assets/images/Big_Picture/timeline.png" data-lightbox="Timeline" data-title="Timeline">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Big_Picture/timeline.png" />
</a>


## Group By Context

:heavy_exclamation_mark: Keep an eye on the planned breaks. Remote collaboration is fun, but also draining. People need breaks to get some fresh air or a new coffee/tea.

The following steps can be mixed as needed. It's the facilitator's task to coordinate work. Meaning, it's likely that you'll jump between context grouping and domain exploration and identify Hot Spots along the way.
{: .alert .alert-info}

Group events that belong together and try to find a name for the group. Again, someone should be in the driver seat, but change them every few minutes.

<a href="{{site.baseurl}}/assets/images/Big_Picture/Grouping.png" data-lightbox="Grouping" data-title="Grouping">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Big_Picture/Grouping.png" />
</a>

:bulb: If you're a large group of participants, now is also
a good moment to split into working groups. Each working group can explore one or more event groups.

## Explore The Domain

It's time to introduce more Event Storming concepts like [Information]({{site.baseurl}}/event_storming/basic-concepts.html#information),
[Actors]({{site.baseurl}}/event_storming/basic-concepts.html#actor), [External Systems]({{site.baseurl}}/event_storming/basic-concepts.html#external-system) and [Commands]({{site.baseurl}}/event_storming/basic-concepts.html#command).

Zoom in by asking questions like *What needs to happen here exactly?* and use examples with personas and concrete data written on the stickies. This deep dive will unfold a lot of new information and knowledge.

<a href="{{site.baseurl}}/assets/images/Big_Picture/Explore_Domain.png" data-lightbox="Explore_Domain" data-title="Explore The Domain">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Big_Picture/Explore_Domain.png" />
</a>

This type of exploration needs a little bit practice. How much detail is too much for a Big Picture? When should we stop with the help of a Hot Spot and continue exploration in a follow up with a smaller group? Don't worry, you'll get better
finding the right level of detail quickly.
{: .alert .alert-warning}

## Identify Hot Spots

[Hot Spots]({{site.baseurl}}/event_storming/basic-concepts.html#hot-spot) are useful during the entire workshop. But still, if exploration get stuck a little you can push it forward again with explicit questions about bottlenecks
or opportunities for improvements: *Is there an area where we could do better? What do our users feel about this user flow here? Should we look at this from a legal perspective? ...*

<a href="{{site.baseurl}}/assets/images/Big_Picture/Hot_Spots.png" data-lightbox="Hot_Spots" data-title="Hot Spots">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Big_Picture/Hot_Spots.png" />
</a>

## Retro

At the end of each day you should do a short retro. You can prepare 2-3 [Frames]({{site.baseurl}}/board_workspace/Frames.html) with questions: *What do you like about Event Storming? What don't you like about Event Storming? Do you have open questions? Could the workshop be improved next time?*
Ask participants to write down their answers on Cards and put them into the respective Frames. 5 minutes should be enough. Remember using prooph board's timer! Then go through the answers and let everybody explain their thoughts.

Feedback is always very important. It helps to learn and grow and give people a good feeling about the next steps.
{: .alert .alert-success}

## What's next?

We hope you enjoyed your first Event Storming and it was a success! Big Picture sessions are already very valuable and you can repeat them or continue with specific areas of the value chain, zoom into sub processes and do
detailed sessions. Every Event Storming will sharpen your knowledge of the domain and create a common understanding of the things going on in the company.

But you can even take it one step further and integrate Event Storming techniques into daily work to improve requirements engineering, collaboration, story writing and task breakdowns, documentation and even code assistance.
How this works is covered in details in the next chapter: Collaborative Modelling.
