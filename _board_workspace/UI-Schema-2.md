---
layout: default
title: UI Schema
toc_order: 07
---

[Cody Play]({{site.baseUrl}}/cody_play/a-playground-for-your-design.html) and [Cody Engine]({{site.baseUrl}}/cody_engine/introduction.html) use [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/docs/)
to render forms and views.

Views of data objects are rendered as read-only forms with a styling defined through the CSS class `stateview`.
{: .alert .alert-info}

React JSON Schema Form takes the [Schema]({{site.baseUrl}}/board_workspace/Schema.html) of a Command or Information and automatically generates a form for it including validation rules.
Based on the type of the schema and its properties, different form fields are rendered. For example `string|format:date` results in a date input field with a date picker.

You can have a look at the documentation of [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/docs/){: target="_blank" rel="noopener noreferrer"}{: .alert-link} and the [playground](https://rjsf-team.github.io/react-jsonschema-form/){: target="_blank" rel="noopener noreferrer"}{: .alert-link}
to try it out.
{: .alert .alert-info}

## Customizing Look and Feel

The cody tab in the [Metadata]({{site.baseUrl}}/board_workspace/Metadata.html) sidebar lets you define a **UI Schema** for commands and information.
If you want to change the default behavior of React JSON Schema Form or view components provided by prooph (e.g. the TableView), you can use the UI Schema.

Command forms and data object views (Information with an object schema) work with the [ui schema options](https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema){: target="_blank" rel="noopener noreferrer"}{: .alert-link} provided by React JSON Schema Form. 
{: .alert .alert-info}

## Custom Widgets

Coming soon

## Table View

Coming soon
