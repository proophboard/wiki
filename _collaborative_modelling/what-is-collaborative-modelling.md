---
layout: default
title: What is Collaborative Modelling
toc_order: 01
---

The classical approach to software development is throwing requirements specifications over the wall to a group of developers.
Developers then take those requirements, interpret them and write code that they think does exactly what was asked for.
Sounds simple, but we all know it isn't.

<a href="{{site.baseurl}}/assets/images/Waterfall.png" data-lightbox="Waterfall" data-title="Waterfall">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Waterfall.png" />
</a>

Agile methods like Scrum aim to solve the problem by focusing more on the product and allowing only a rough roadmap.
Precise requirements (problem briefs) are defined for one or two sprints only. That makes sense, because requirements
are never perfect. There are just too much unknown unknowns along the way. So agile methods have improved the situation a lot.
Unfortunately, in many cases results are still not as expected. Development takes too long, users are not satisfied, the software is buggy.

Why this? Well, agile methods alone are only half of the story. A common mistake is that requirements/problem briefs are still thrown over the wall.
They are only planned for a couple of weeks ahead, but the problem stays the same. One group of people is responsible
for requirements engineering while another group tries to interpret them and writes the software.

<a href="{{site.baseurl}}/assets/images/Scrum.png" data-lightbox="Scrum" data-title="Scrum">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Scrum.png" />
</a>

The translation process from requirements into software is the problematic part. Story writing and grooming are often seen as boring ceremonies.
Developers want to code and not sit in endless meetings. But, without a product-driven mindset people are not able to fully understand the reasoning behind
requirements. They start making their own assumptions while writing the software and more often than not these assumptions are wrong.
A sprint cycle of two weeks reduces the risk of wrong assumptions being hidden until the end of the project, but it does not solve the problem of wrong assumptions in the first place.
{: .alert .alert-danger}

The goal of Collaborative Modelling is to enable a product-driven and outcome oriented way of working. This eliminates wrong assumptions before they find
their way into software. Software development is expensive. The earlier you get wrong assumptions out of the way, the cheaper becomes the whole software development cycle.
{: .alert .alert-success}

## Cross-Functional Teams

To foster product-driven development, requirements need to be defined by the people who also build the software. The only reasonable way is working in cross-functional teams.

<a href="{{site.baseurl}}/assets/images/Cross-functional.png" data-lightbox="Cross-functional" data-title="Cross-functional">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/Cross-functional.png" />
</a>

:bulb: Only if business experts, UX designers (even end users), product managers and tech people work closely together and have in depth discussions the problem can be solved.

Collaborative Modelling provides a way for cross-functional teams to design software together, even if not all people know how to code. An abstract model helps to communicate on a level
that is easy to understand on the one hand but still powerful enough to be a blueprint for software solutions.

*Visualizing problems and solutions, sketching different ideas and playing with examples is much more fun and way more effective than reading through problem briefs and writing stories.*

[prooph board](https://prooph-board.com/){: .alert-link} uses ideas from [Event Storming]({{site.baseurl}}/event_storming/what-is-event-storming.html){: .alert-link} to let a cross-functional team design an abstract model. The cherry on top is a coding bot
that becomes a hidden team member and provides assistance for translation of an abstract model into working software.
{: .alert .alert-info}

*Please Note: We're working constantly on adding new content to the Collaborative Modelling chapter.
Since we work together with our users in real projects, we discover new techniques and tricks regularly. It's worth looking into the Wiki from time to time.
Also join the community on <a href="https://gitter.im/proophboard/community" target="_blank" rel="noopener noreferrer">Gitter</a> or <a href="https://www.linkedin.com/groups/9135097/" target="_blank" rel="noopener noreferrer">LinkedIn</a> for updates!*
