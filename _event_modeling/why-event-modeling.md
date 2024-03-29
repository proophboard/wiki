---
layout: default
title: Why Event Modeling
toc_order: 01
---

Event-centric design and software modeling.
Product teams can use Event Modeling on a daily basis &ndash; seamlessly integrated into the development workflow.

![Event Modeling]({{site.baseurl}}/assets/images/event-modeling/em-sticker.png) 

Event Modeling provides a list of great benefits:

- One tool for the entire team to discuss and design software
- Event-driven Architecture design made easy
- System documentation
- Cross-Team collaboration
- API contract negotiation and documentation between teams 
- Reliable work estimation
- Flat cost curve
- Modular systems
{: .checked-list}

Originally invented by [Adam Dymitruk](https://www.linkedin.com/in/eventmodeling/){: target="_blank" rel="noopener noreferrer"}, Event Modeling is used by teams around the globe.
Check out the official website [eventmodeling.org](https://www.eventmodeling.org/){: target="_blank" rel="noopener noreferrer"}.

On prooph board, we use our own interpretation of Event Modeling that is optimized for continuous integration.
{: .alert .alert-info}

Before we dive in, let's have a quick review of how software development evolved and why there is still room for **improophment™**.

## Waterfall

The classical approach to software development is throwing requirements specifications over the wall to a group of developers.
Developers then take those requirements, interpret them and write code that they think does exactly what was asked for.
Sounds simple, but we all know it isn't.

<a href="{{site.baseurl}}/assets/images/Waterfall.png" data-lightbox="Waterfall" data-title="Waterfall">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Waterfall.png" />
</a>

*This is also known as the "Stille-Post Effect". Here is a LinkedIn post describing the effect:*

[![Alberto Brandolini about Developer Assumptions]({{site.baseurl}}/assets/images/CES/Alberto_Quote_Assumptions.png)](https://www.linkedin.com/posts/alexander-miertsch-make-remote-meetings-fun-again_eventstorming-collaboration-softwaredesign-activity-6972994986912972800-hcFL?utm_source=share&utm_medium=member_desktop){: target="_blank" rel="noopener noreferrer"}
*(click on the image to get to the post)*

## Agile Methods

Agile methods like Scrum aim to solve the problem by focusing more on the product and allowing only a rough roadmap.
Precise requirements (e.g. problem briefs) are defined for one or two sprints only. That makes sense, because requirements
are never perfect. There are just too much unknown unknowns along the way. So agile methods have improved the situation a lot.
Unfortunately, in many cases results are still not as expected. Development takes too long, users are not satisfied, the software is buggy.

Why this? Well, agile methods alone are only half of the story. A common mistake is that the different roles of an agile team still work on their own.
So the PO is doing requirements engineering, UX is designing and developers are developing.

<a href="{{site.baseurl}}/assets/images/Scrum.png" data-lightbox="Scrum" data-title="Scrum">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Scrum.png" />
</a>

Each role uses specific tools, a different mindset and a different language. They try to work together as a team, but they often don't really talk about the same thing.
We've seen many story writing and task preparation sessions that caused more confusion than actually clarified things.
{: .alert .alert-danger}

## Enter Cross-Functional Teams

The goal of prooph board is to enable a product-driven and outcome oriented way of working that includes the entire team into the software design process.
{: .alert .alert-success}

<a href="{{site.baseurl}}/assets/images/Cross-functional.png" data-lightbox="Cross-functional" data-title="Cross-functional">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Cross-functional.png" />
</a>

:bulb: Only if business experts, UX designers (even end users), product managers and tech people work closely together and have in depth discussions the problem can be solved.

prooph board provides a way for cross-functional teams to design software together, even if not all people know how to code. An abstract model helps to communicate on a level
that is easy to understand on the one hand but still powerful enough to be a blueprint for software solutions.

*Visualizing problems and solutions, sketching different ideas and playing with examples is much more fun and way more effective than reading through problem briefs and writing stories.*

[prooph board](https://prooph-board.com/){: .alert-link} uses ideas from [Event Storming]({{site.baseurl}}/event_storming/what-is-event-storming.html){: .alert-link}
and [Event Modeling](https://eventmodeling.org/posts/what-is-event-modeling/){: .alert-link}{: target="_blank" rel="noopener noreferrer"}
to let a cross-functional team design an abstract model. The cherry on top is our coding bot
[Cody]({{site.baseurl}}/cody/introduction){: .alert-link} that becomes a hidden team member and provides assistance for translation of an abstract model into working software.
{: .alert .alert-info}

In the next chapter, we explain [how to]({{site.baseurl}}/event_modeling/how-to.html) integrate prooph board into the development workflow.

If you first want to know why Event Modeling is such a great technique, you can take a look at our in-depth [philosophy]({{site.baseUrl}}/event_modeling/philosophy.html) behind the approach.

