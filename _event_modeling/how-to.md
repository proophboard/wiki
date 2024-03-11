---
layout: default
title: How To
toc_order: 03
---

Here you find suggestions on how to integrate Event Modeling into your existing development process. 
Keep in mind that every team is different so should be their processes. Iterate on the format until you feel comfortable.

## Storm-Design-Validate-Build Cycle

Our approach is based on an iterative software development process consisting of four distinct phases.

<a href="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle.png" data-lightbox="Storm-Design-Validate-Build Cycle" data-title="Storm-Design-Validate-Build Cycle">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle.png" />
</a>


### Phase I: Big Picture Event Storming

<a href="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Storm.png" data-lightbox="Phase I: Big Picture Event Storming" data-title="Phase I: Big Picture Event Storming">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Storm.png" />
</a>

Brainstorm ideas, collect requirements and user needs, get the [Big Picture]({{site.baseUrl}}/event_storming/big_picture). 

#### How
This phase is best done as a workshop together with domain experts, key users, and basically everybody who has a stake in the software.

#### Work Mode
Moderated collaboration in workshop-like sessions. Depending on the topic, the number of sessions can vary from one to many.

#### Estimating
Plan the sessions ahead. Be aware that all involved people have a though schedule. Prepare yourself for making the sessions as efficient as possible.

### Phase II: Event Modeling Design

<a href="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Design.png" data-lightbox="Phase II: Event Modeling Design" data-title="Phase II: Event Modeling Design">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Design.png" />
</a>

Dive into the details, create a story plot, design the information flow.

#### How
Take the learnings from phase I and sketch a software design using [Event Modeling on prooph board](({{site.baseUrl}}/event_modeling/event-modeling-on-prooph-board.html)).

#### Work Mode

Highly creative phase. Put on the explorer hat. Take your time for research, deep discussions, and feedback. 
Iterate on the design. Sketch multiple models, and try them in [Cody Play]({{site.baseUrl}}/cody_play/a-playground-for-your-design.html).

### Estimating

Creative work is hard to estimate. Define timeboxes and investigation tasks. 
Negotiate with stakeholders how much time/money is worth to spend on the topic at hand.

### Phase III: Prototype Validation

<a href="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Validate.png" data-lightbox="Phase III: Prototype Validation" data-title="Phase III: Prototype Validation">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Validate.png" />
</a>

Perform a completeness check.

#### How
Validate the design in the Cody Play prototyping sandbox. Go through different scenarios with high quality test data.
Check that information flows smoothly through the system, and the user journey matches with the sketched story plot.

#### Estimating
Set a fixed timebox depending on the size of the topic. Use the number of Event Modeling Slices as an indicator for how long the timebox should be.

### Phase IV: Software Build

<a href="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Build.png" data-lightbox="Phase IV: Software Build" data-title="Phase IV: Software Build">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/event-modeling/SDVB-Cycle-Build.png" />
</a>

Develop, test, and deploy the software (or a part of it).

#### How
Build the software using the Event Modeling Design as a blueprint. If you're using Cody Engine, you can let Cody generate source code that behaves like the Cody Play prototype.
Then customize the software to satisfy quality and usability standards of your org.

#### Estimating
Event Modeling emphasis a design made of little bricks (called Slices), that can be plugged together to form a software. On average, each Slice will take the same time to implement.
Over time, you'll get a very good feeling for how long you need for a single slice. So you can just count the Slices and multiply them with your average time.

### Development Process Integration

The SDVB Cycle can be integrated in any software development process. If you work with Scrum sprints, you have small iterations, and maybe do Phase I only for new epics.
Shape Up also works great in combination with SDVB. You can set up a dual track, where part of the team is doing Phase II and Phase III, while the other part is doing Phase IV.
Mix and match how you see fit. Just make sure that all four phases are represented in your specific workflow.

Each team should have its own board within the organization. prooph board ships with advanced features to link and synchronize information across boards, 
which makes it easy to create high level system and process overviews.
{: .alert .alert-warning}

## Team Collaboration

We suggest having regular collaboration sessions going from one phase to the next. 

💡 _Pro Tip:_ Divide the team board into two areas. The first one focuses on the "Problem Space". 
So in this area, anyone can bring up a problem or idea that the team should tackle in one of the next iterations. 
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

When collaborating on prooph board you'll soon need to find a good way to manage Hot Spots.

We love Hot Spots. They are the best tool in a collaboration session to keep focus. It's easy to zoom into process details or spontaneously discuss ideas with Event Storming. But at some point you'll need to stop to not lose focus on the main session topic. Hot Spots are made for such situations:

- Discovered a new bottleneck -> write it on a [Hot Spot]({{site.baseurl}}/event_storming/basic-concepts.html#hot-spot){: target="_blank"}
- Found a promising new idea -> write it on a [Hot Spot](({{site.baseurl}}/event_storming/basic-concepts.html#hot-spot)){: target="_blank"}
- Need to address a bug in the system -> write it on a [Hot Spot]({{site.baseurl}}/event_storming/basic-concepts.html#hot-spot){: target="_blank"}
{: .checked-list}

A couple of sessions later your prooph board will be full of Hot Spots. That's normal. It always happens. People get the idea of Hot Spots really quick.

But a Hot Spot is only as good as the action item derived from it! So how to distinguish between urgent Hot Spots that need to be resolved as soon as possible and for example ideas for later?

To categorize Hot Spots you can use [Card Tags]({{site.baseurl}}/board_workspace/Cards.html#tagging). We assign the tag **#later** to all Hot Spots containing ideas. Tagging Hot Spots allows you to filter them in the tree view. You can search for tags in combination with card types and also use a "NOT" operator to look up all Hot Spots that don't have a specific tag assigned.

<a href="{{site.baseurl}}/assets/images/CES/hot_spot_tagging.gif" data-lightbox="hot_spot_tagging" data-title="Hot Spot Tagging">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/CES/hot_spot_tagging.gif" />
</a>

## Design-first Approach

Once the team decided to invest time into an idea or user need, they should design a solution together.
If needed, give UX/UI a couple of days to prepare wireframes. Usually, some questions (Hot Spots) also need to be clarified before diving into design details.

Everything prepared? Awesome! Then it's time to meet on prooph board for some Event Modeling. You are going to describe the solution in all its details 
from data structures to UI flows and business rules.

We've prepared a [Step-by-Step Guide]({{site.baseUrl}}/event_modeling/event-modeling-on-prooph-board.html) for you.



