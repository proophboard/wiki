---
layout: default
title: What is Collaborative Modelling
toc_order: 01
---

The classical approach to software development is throwing requirements specifications over the wall to a group of developers.
Developers then take those requirements, interpret them and write code that they think does exactly what was asked for.
Sounds simple, but we all know it isn't. Agile methods like Scrum aim to solve the problem by allowing only a rough roadmap.
Precise requirements are defined for one or two sprints only (sprint usually equals 2 weeks). That makes sense, because requirements
are never perfect. There are just too much unknown unknowns along the way. So agile methods have improved the situation a lot.
Unfortunately, in many cases results are still not as expected. Development takes too long, users are not satisfied, the software is buggy.

Why this? Well, agile methods alone are only half of the story. A common mistake is that requirements are still thrown over the wall.
They are only planned for a couple of weeks ahead &mdash; not 6 months or more &mdash; but the problem stays the same. One group of people is responsible
for requirements engineering while another group tries to interpret them and writes the software.

The translation process from requirements into software is the problematic part. When people are not able to fully understand the reasoning behind
requirements, they start making their own assumptions and more often than not these assumptions are wrong. A sprint cycle of two weeks reduces the risk
of wrong assumptions being hidden until the end of the project, but it does not solve the problem of wrong assumptions in the first place.
{: .alert .alert-danger}

The goal of Collaborative Modelling is to eliminate wrong assumptions before they find their way into software. Software development is expensive.
The earlier you get wrong assumptions out of the way, the cheaper becomes the whole software development cycle.
{: .alert .alert-success}

## Cross-Functional Teams

To avoid wrong assumptions, requirements need to be defined by the people who also build the software. The only reasonable way is working in cross-functional teams.

:bulb: Only if business experts, UX designers (even end users), product managers and tech people work closely together and have in depth discussions the problem can be solved.

Collaborative Modelling provides a way for cross-functional teams to design software together, even if not all people know how to code. An abstract model helps to communicate on a level
that is easy to understand on the one hand but still powerful enough to be a blueprint for software solutions.

[prooph board](https://prooph-board.com/){: .alert-link} uses ideas from [Event Storming]({{site.baseurl}}/event_storming/what-is-event-storming.html){: .alert-link} to let a cross-functional team design an abstract model. The cherry on top is a coding bot
that becomes a hidden team member and provides assistance for translation of an abstract model into working software.
{: .alert .alert-info}

*Please Note: We're working constantly on adding new content to the Collaborative Modelling chapter.
Since we work together with our users in real projects, we discover new techniques and tricks regularly. It's worth looking into the Wiki from time to time.
Also join the community on <a href="https://gitter.im/proophboard/community" target="_blank" rel="noopener noreferrer">Gitter</a> or <a href="https://www.linkedin.com/groups/9135097/" target="_blank" rel="noopener noreferrer">LinkedIn</a> for updates!*
