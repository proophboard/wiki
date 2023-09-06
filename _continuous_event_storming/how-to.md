---
layout: default
title: How To
toc_order: 03
---

Teams that want to integrate Event Storming into their daily work find some useful suggestions here. Please treat them as such! In the beginning, you're of course looking for some guidance, and we are happy to provide it here as well as with our workshops. 
But every team is different so should be their processes. Iterate on the format until you feel comfortable.

## Sprint Integration

Many teams organize their work in sprints. While the team is working on one sprint at a time, the next one is prepared. Preparation should be done in collaboration sessions. 
So turn them into Event Stormings. Do you already have meetings set for task preparation and story writing? These are the candidates we are looking for.

Each team should have its own board within the organization. prooph board ships with advanced features to link and synchronize information across boards, 
which makes it easy to create high level system and process overviews.
{: .alert .alert-warning}

## Problem Space

We suggest having two regular meeting types and also divide the team board into two areas. The first one focuses on the "Problem Space". 
So in this meeting, anyone can bring up a problem or idea that the team should tackle in one of the next sprints. 
Often this is done by the product owner, but in a highly motivated, fast-acting team anyone will contribute.
Ideas, problems, and user needs should first be discussed on a high level to get everybody on the same page and decide if the team wants to invest more time. 
Quickly sketch flows with [Domain Events]({{site.baseurl}}/event_storming/basic-concepts.html#domain-event) and other card types as you see fit. 
Mix and match it with formats like [Example Mapping](https://insideproduct.co/example-mapping/){: target="_blank" rel="noopener noreferrer"} 
or [Domain Storytelling](https://domainstorytelling.org/){: target="_blank" rel="noopener noreferrer"} (by using icons + arrows on prooph board). 

To integrate UI Mocks in the collaboration you can either upload screenshots or combine UI Cards with icons and text to simulate [Fat marker sketches](https://basecamp.com/shapeup/1.3-chapter-04#fat-marker-sketches){: .alert-link}.
{: .alert .alert-info}

<a href="{{site.baseurl}}/assets/images/CES/fat_marker_sketch.gif" data-lightbox="fat_marker_sketch" data-title="Fat marker sketch example">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/fat_marker_sketch.gif" alt="Fat marker sketch example" />
</a>

## Managing Hot Spots

When practicing Continuous Event Storming on prooph board you'll soon need to find a good way to manage Hot Spots.

We love Hot Spots. They are the best tool in a collaboration session to keep focus. It's easy to zoom into process details or spontaneously discuss ideas with Event Storming. But at some point you'll need to stop to not lose focus on the main session topic. Hot Spots are made for such situations:

- Discovered a new bottleneck -> write it on a [Hot Spot]({{site.baseurl}}/event_storming/basic-concepts.html#hot-spot){: target="_blank"}
- Found a promising new idea -> write it on a [Hot Spot](({{site.baseurl}}/event_storming/basic-concepts.html#hot-spot)){: target="_blank"}
- Need to address a bug in the system -> write it on a [Hot Spot]({{site.baseurl}}/event_storming/basic-concepts.html#hot-spot){: target="_blank"}

A couple of sessions later your prooph board will be full of Hot Spots. That's normal. It always happens. People get the idea of Hot Spots really quick.

But a Hot Spot is only as good as the action item derived from it! So how to distinguish between urgent Hot Spots that need to be resolved as soon as possible and for example ideas for later?

To categorize Hot Spots you can use [Card Tags]({{site.baseurl}}/board_workspace/Cards.html#tagging). We assign the tag **#later** to all Hot Spots containing ideas. Tagging Hot Spots allows you to filter them in the tree view. You can search for tags in combination with card types and also use a "NOT" operator to look up all Hot Spots that don't have a specific tag assigned.

<a href="{{site.baseurl}}/assets/images/CES/hot_spot_tagging.gif" data-lightbox="hot_spot_tagging" data-title="Hot Spot Tagging">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/hot_spot_tagging.gif" />
</a>

## Solution Space

The second type of meeting is focused on the "Solution Space". Once the team decided to invest time into an idea or user need, they should design a solution together.
If needed, give UX/UI a couple of days to prepare wireframes. Usually, some questions (Hot Spots) also need to be clarified before entering the Solution Space.

Everything prepared? Awesome! Then it's time to meet on prooph board for some "Design-Level Event Storming". This is the most zoomed-in variation of Event Storming 
describing the solution in all its details from data structures to UI flows and business rules.

We've prepared a [Step-by-Step Guide]({{site.baseUrl}}/continuous_event_storming/event-map-design.html) for you.



