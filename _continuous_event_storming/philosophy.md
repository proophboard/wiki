---
layout: default
title: Philosophy
toc_order: 02
---

You might ask yourself why should you spend time learning Continuous Event Storming and is it worth the effort to change your development workflow? 
Maybe even change the system architecture?

This page provides you with some fundamental thoughts that are at the core of this technique. It should help you understand where we are coming from
and where we are heading to. If you want to join us on that journey is up to you :).

## Change is the root of Time

> "Nothing happens until something moves."

– Albert Einstein

Since Einstein we know that time is relative. It moves relative to the observer. 
This also means, that time is not a given. The clock is not ticking out of nowhere. 
Time is basically a measurement between two **events**.

Without events time would not exist, because if nothing changes you have nothing to measure.

## Event equals Information changed over Time

We perceive our environment through events. If we see something, it already happened. The picture in our head is a picture of the past.
As an example, if you look at a star in the sky at night you cannot really know if the star still exists. The light of the star needs a lot of light years to reach the earth
and finally your eyes.

When we see, hear, smell, touch or taste something we basically process information. The difference between one set of information and another set of information makes our reality.
Our senses process information changes that already happened aka **events**.

:bulb: **Events are at the core of our reality.**

## Why does it matter?

When it comes to traditional software design, people tend to put a lot of focus on things and how they relate to each other. 
In other words, they focus on specific sets of information and how those sets are connected.
That itself is not a bad idea. However, the order is wrong.

:bulb: **Information is always the result of one or more events.**

If you design an information system without putting events at the core, you're doomed. You're ignoring the fundamental building blocks
of our reality or at least give them less attention. This results in so-called accidental complexity. At the beginning of a new system everything looks clear and simple.
But you continue to add more and more information changes and at some point you loose control over it. Without proper events that reflect information change over time,
you cannot tell **why something happened**. Yesterday the system was all good then someone did something, and now it's broken, 
but you cannot perceive what happened, because you missed the events.

Observability of how information changed over time is super important when the system reached a certain level of complexity.
{: .alert .alert-warning}

Now one could argue: we have logs and logging tables for observability. We also have Mixpanel or Google Analytics in the frontend to track user behavior. So we know what happened.

Well, that's true. But usually logs in whatever way are an afterthought. They are not part of the design process, and they are not at the heart of the system. 
It's an additional layer instead of being the foundation. Which basically reduces efficiency, clarity and alignment. 

## Patterns embrace efficiency

> A pattern is a regularity in the world, in human-made design, or in abstract ideas. As such, the elements of a pattern repeat in a predictable manner.

– [Wikipedia](https://en.wikipedia.org/wiki/Pattern)

Let's look at the pattern of what we've discussed so far.

### Basic Pattern

<a href="{{site.baseurl}}/assets/images/philosophy/basic-pattern.png" data-lightbox="basic-pattern" data-title="Basic Pattern">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/basic-pattern.png" />
</a>

You have Information. Changing the Information is an Event at a specific point in time. That gives you new Information, which can be changed again and so on.
No matter how complex a system is as a whole, a single unit of work should always be designed around that simple pattern.

And since events are at the core you can even simplify the pattern to this:

<a href="{{site.baseurl}}/assets/images/philosophy/simplified-basic-pattern.png" data-lightbox="Simplified Basic Pattern" data-title="Simplified Basic Pattern">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/simplified-basic-pattern.png" />
</a>


Without an Event you cannot tell why Information is what it is at a specific point in time. It's just a snapshot like one frame of a movie or a thumbnail of YouTube video. 
A desired Change is also incomplete without an Event, because you cannot tell if the Change really happened. If you have an older snapshot of the Information, you can try it by comparing
the old snapshot with the new one, but still you cannot be 100% sure that the desired Change was actually the one that caused the Information to change.

Contrary to that, by looking at an Event you can say:

1. There was a desired Change, and it really happened because you can see the Event.
2. The Event produced a new set of Information.

So you can purely focus on events and design everything else around them. And that's the reason why a [Big Picture Event Storming]({{site.baseUrl}}/event_storming/big_picture.html#first-event)
should always start with collecting events. It is one fundamental concept, and it is very easy to grasp. 
It provides you with everything you need to discuss behavior of a system, and it will be the same at any other scale or detail level. 

Now lets look at a few different scales.

### With User Interface

<a href="{{site.baseurl}}/assets/images/philosophy/pattern-with-ui.png" data-lightbox="Pattern with UI" data-title="Pattern with UI">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/pattern-with-ui.png" />
</a>

Information is viewed by a user in a user interface. The interface provides the user with an option to tell the system: "Please change the Information in a particular way!".
If and only if the system processes the desired Change a new Event has been occurred and the user can view the changed Information in the User Interface again. 

### With Digitized Rules

<a href="{{site.baseurl}}/assets/images/philosophy/pattern-with-rules.png" data-lightbox="Pattern with Rules" data-title="Pattern with Rules">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/pattern-with-rules.png" />
</a>

Good software systems don't blindly trust the user. Usually they have business knowledge incorporated to protect invariants.
What the user wants to change is one thing, what they are allowed to change is a different story. The best place for such rules is between
a desired Change and an Event. If the Change is not accepted by the system, it is either rejected (so no Event happened at all) or a different Event occurs.

### With Digitized Reaction

<a href="{{site.baseurl}}/assets/images/philosophy/pattern-with-digitized-reaction.png" data-lightbox="Pattern with Reaction" data-title="Pattern with Reaction">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/pattern-with-digitized-reaction.png" />
</a>

To increase efficiency of a process or be able to scale it, manual steps made by humans are often replaced by some kind of automation.
Having events in place, that's a straight forward task. Process automation can be designed and implemented as a reaction to events.

**If this Event happened, do that Change next.** 

### Unit of Work

<a href="{{site.baseurl}}/assets/images/philosophy/pattern-with-function.png" data-lightbox="Pattern with Function" data-title="Pattern with Function">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/pattern-with-function.png" />
</a>

Processing a desired Change can be described as a function of the system – a unit of work.

### Function Composition

A system composes a set of functions while acting as one "big function" to the outside world. 

<a href="{{site.baseurl}}/assets/images/philosophy/pattern-with-system-detailed.png" data-lightbox="Pattern within System" data-title="Pattern within System">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/pattern-with-system-detailed.png" />
</a>

Or the Big Picture view of the same system:

<a href="{{site.baseurl}}/assets/images/philosophy/pattern-with-system-simplified.png" data-lightbox="simplified Pattern within System" data-title="simplified Pattern within System">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/philosophy/pattern-with-system-simplified.png" />
</a>

At an even higher level a system of systems can be composed of multiple sub systems and so on. 

You see the repeating pattern? **Composition is the only solid way to tackle complexity.**

### The Pattern is everywhere

Developing software is a multidisciplinary activity best done by a team of experts in their respective fields.
A typical list of disciplines includes (sometimes more, sometimes less):

- research
- design
- knowledge crunching
- implementation
- testing
- documentation
- monitoring
- reporting
- maintenance
- support
- scaling

All this activities have to be coordinated. People with different attitude and aptitude have to work together. 
Successful collaboration requires very good communication. Everybody needs to be on the same page. Everybody should talk about the same things
using the same wording. Everybody should understand the work of every other team member to some extent. This does not mean, that everybody needs to be
an expert in every field, but there should be some kind of overlapping understanding.

If you've read this page carefully and understand the implications, you might have an "Aha moment" now. When events are at the core of reality, and they are also at the 
core of the behavior of a system, then they can also be at the core of any activity related to working on a system. They cannot only be at the core, they actually are at the core!
You just have to make the implicit explicit.
{: .alert .alert-success}

Collaboration based on Continuous Event Storming and a system architecture based on events does exactly that. If you want to learn more head over to the next page: [How To]({{site.baseUrl}}/continuous_event_storming/how-to.html)




