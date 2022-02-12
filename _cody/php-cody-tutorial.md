---
layout: default
title: PHP Cody Tutorial
toc_order: 06
---

[prooph board](https://prooph-board.com/) can connect to a coding bot called **Cody**. With its help you can generate working code from an event map.
This tutorial guides you through the first steps. You'll learn the basics as well as customizing code generation to suit your needs.

## Preparation

We've prepared a [repository](https://github.com/proophboard/php-cody-tutorial) containing some exercises.

Please make sure you have installed [Docker](https://docs.docker.com/install/ "Install Docker")
and [Docker Compose](https://docs.docker.com/compose/install/ "Install Docker Compose") to execute the exercises.
Jest is used to validate the results.

1. Clone Repo and execute setup

```bash
git clone git@github.com:proophboard/php-cody-tutorial.git
cd php-cody-tutorial
./setup.sh
```

2. Create cody tutorial board on prooph board and test connection

You can use [prooph board free version](https://free.prooph-board.com/) for the tutorial (no login required).

_[prooph board](https://prooph-board.com/){: .alert-link} is a modeling tool specifically designed for remote Event Storming. It ships with realtime collaboration features for teams (only available in paid version). The free version is a standalone variant without any backend connection. Your work is stored in local storage and can be exported. It is hosted on Github Pages and has the same code generation capabilities as the SaaS version._
{: .alert .alert-info}

Create a new board called "Cody Tutorial". You'll be redirected to the fresh board. Choose "Cody" from top menu to open the **Cody Console**. Just hit ENTER in the console to connect to the default Cody server that we've setup and started in the previous step.

Finally type "**/help**" in the console to let Cody explain the basic functionality.

<a href="{{site.baseurl}}/assets/images/cody_tutorial_connect.gif" data-lightbox="Connect" data-title="Connect to Cody">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_connect.gif" />
</a>

### Cody Explained

**Cody** is a http server running in a docker container on your local machine. prooph board can connect to it using `/connect [server address]` in the **Cody Console**. `codyconfig.php` is the central place to configure code generation. Generated code needs to be written to a target repository. We can use a docker volume mount to give **Cody** access to our project repository. In the tutorial our project is represented by `exercises`, which contains a PHPUnit test case for each exercise to validate that generated code looks like the expected one.
{: .alert .alert-success}

## Exercise I

Your folder structure should look like this:

```
cody-tutorial
|__ cody-bot
|__ exercises
```

The Cody Server should be running and listen on `http://localhost:3311`:

```bash
cd cody-tutorial/cody-bot
docker-compose ps

         Name                        Command               State           Ports
-----------------------------------------------------------------------------------------
iio_iio-ic-react-http_1   docker-php-entrypoint vend ...   Up      0.0.0.0:3311->8080/tcp
```

:bulb: _Note: Use `dev.sh` to start **Cody**. After that you can use docker-compose commands to stop, start again, inspect logs, etc. A file watcher restarts the server on changes. If something does not work as expected try to restart the server manually and take a look at the logs: `docker-compose stop && docker-compose up -d && docker-compose logs -f`_

### Test-Driven Exercises

Navigate to the tutorial project in a **second** console and run the first exercise using:

```bash
cd cody-tutorial/exercises
docker-compose run --rm composer exercise1
```

<a href="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_1.png" data-lightbox="Failing-Exercise-1" data-title="Failing Exercise 1">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_1.png" />
</a>

Of course the test case is failing. it is looking for a **Command** called **AddBuilding** and that's the first class we want to generate from a prooph board event map. You might have noticed the commented hooks in `codyconfig.php`. What we need is a `CommandHook`, so let's create one!

### Create Command Hook

```bash
# current dir: cody-tutorial/cody-bot
# Create a Hook folder
mkdir src/Hook
# Create CommandHook.php
touch src/Hook/CommandHook.php
```
Open `src/Hook/CommandHook.php` in your favorite editor and copy this content into it:

```php
<?php
declare(strict_types=1);

namespace EventEngine\InspectioCody\Hook;

use EventEngine\InspectioCody\Board\BaseHook;
use EventEngine\InspectioCody\Http\Message\CodyResponse;
use EventEngine\InspectioCody\Http\Message\Response;
use EventEngine\InspectioGraphCody\Node;
use stdClass;

final class CommandHook extends BaseHook //BaseHook provides some helper methods like writeFile()
{
    /**
     * @param  Node     $command Information about Command sticky received from prooph board event map
     * @param  stdClass $context Context object populated in codyconfig.php
     * @return CodyResponse      Response sent back to prooph board, shown in Cody Console
     */
    public function __invoke(Node $command, stdClass $context): CodyResponse
    {
        $commandName = $command->name();
        $commandFile = $commandName . '.php';
        $commandPath = $context->path . '/Command/' . $commandFile;

        $code = <<<CODE
        <?php
        declare(strict_types=1);

        namespace Cody\Tutorial\Command;

        class $commandName
        {

        }
        CODE;

        $this->writeFile($code, $commandPath);

        return Response::fromCody(
            "Command \"{$commandName}\" generated",
            ["Command written to {$commandPath}"]
        );
    }
}

```

### Register Hook in codyconfig

To activate the hook, we need to register it in `codyconfig.php`:

```php
<?php

/**
 * @see       https://github.com/event-engine/php-inspectio-cody for the canonical source repository
 * @copyright https://github.com/event-engine/php-inspectio-cody/blob/master/COPYRIGHT.md
 * @license   https://github.com/event-engine/php-inspectio-cody/blob/master/LICENSE.md MIT License
 */

declare(strict_types=1);

use EventEngine\InspectioCody\CodyConfig;
// IMPORT COMMAND HOOK
use EventEngine\InspectioCody\Hook\CommandHook;

$context = new stdClass(); // replace it with your own context class

$context->path = '/exercises/src';

return new CodyConfig(
    $context,
    [
//        CodyConfig::HOOK_ON_AGGREGATE => new AggregateHook(),
        // UNCOMMENT COMMAND HOOK
        CodyConfig::HOOK_ON_COMMAND => new CommandHook(),
//        CodyConfig::HOOK_ON_EVENT => new EventHook(),
//        CodyConfig::HOOK_ON_POLICY => new PolicyHook(),
//        CodyConfig::HOOK_ON_DOCUMENT => new DocumentHook(),
    ]
);

```

### Modeling On Event Map

**Cody** is now able to turn information from command stickies (on a prooph board event map) into PHP classes. Switch to the Cody Tutorial board in prooph board and add a command sticky (blue one) with label `AddBuilding`. Right click on the newly created sticky and choose **Trigger Cody** from context menu. In the **Cody Console** you can check the response. Cody should tell you: `Command "AddBuilding" generated`.

<a href="{{site.baseurl}}/assets/images/cody_tutorial_add_building_command.gif" data-lightbox="Add-Building-Command" data-title="Add Building Command">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_add_building_command.gif" />
</a>

Awesome, it works! Rerun:

```bash
docker-compose run --rm composer exercise1
```

It should turn green now. The test verifies that a **Cody\Tutorial\Command\AddBuilding** has been generated by **Cody** and put into **cody-tutorial/exercises/src/Command/AddBuilding.php**.

<a href="{{site.baseurl}}/assets/images/cody_tutorial_succeeding_exercise_1.png" data-lightbox="Succeeding-Exercise-1" data-title="Succeeding Exercise 1">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_succeeding_exercise_1.png" />
</a>

In exercise I we implemented our first **Cody Hook** and registered it in `codyconfig.php`. The hook is called with information received from a prooph board event map
and with a user defined context object, which can be used to pass configuration options (like a source path) to each hook.
We can trigger the hook from prooph board by selecting an appropriate sticky on an event map and **Trigger Cody** from context menu.
{: .alert .alert-success}

## Exercise II

To see what we have to do next, execute:

```bash
docker-compose run --rm composer exercise2
```

<a href="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_2.png" data-lightbox="Failing-Exercise-2" data-title="Failing Exercise 2">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_2.png" />
</a>


We're asked to add a `buildingId` and a `name` property (both of type `string`) to the `AddBuilding` command. Now it would be easy to just open the class and add those two properties. But we should expand our code generation logic instead. This has some significant advantages:

- a prooph board event map acts as documentation
- one can generate contracts like an OpenAPI schema from Card Metadata
- it is easier to discuss and design new features or refactorings when such details are included on the event map

### Expand Command Hook Logic

Ok let's use a simple code generator implementation first to understand the basics. In a later tutorial part we'll look at some useful libraries
that provide abstractions for advanced use cases.

Change the command hook in `cody-tutorial/cody-bot/src/Hook/CommandHook.php` like this:

```php
<?php
declare(strict_types=1);

namespace EventEngine\InspectioCody\Hook;

use EventEngine\InspectioCody\Board\BaseHook;
use EventEngine\InspectioCody\Http\Message\CodyResponse;
use EventEngine\InspectioCody\Http\Message\Response;
use EventEngine\InspectioGraphCody\Node;
use stdClass;
use function is_array;
use function json_decode;

final class CommandHook extends BaseHook //BaseHook provides some helper methods like writeFile()
{
    /**
     * @param  Node     $command Information about Command sticky received from prooph board event map
     * @param  stdClass $context Context object populated in codyconfig.php
     * @return CodyResponse      Response sent back to prooph board, shown in Cody Console
     */
    public function __invoke(Node $command, stdClass $context): CodyResponse
    {
        $commandName = $command->name();
        $commandFile = $commandName . '.php';
        $commandPath = $context->path . '/Command/' . $commandFile;

        // Get raw metadata info about command and convert it to associative array
        $metadata = json_decode($command->metadata(), true);

        $properties = "";

        if(is_array($metadata)) {
            // @TODO: some structural validation might be a good idea here
            foreach ($metadata as $property => $type) {
                // Each property-type-pair is appended to properties string
                // and resulting string is inserted in the class template below
                $properties.= "    public $type $$property;\n";
            }
        }


        $code = <<<CODE
        <?php
        declare(strict_types=1);

        namespace Cody\Tutorial\Command;

        class $commandName
        {
        $properties
        }
        CODE;

        $this->writeFile($code, $commandPath);

        return Response::fromCody(
            "Command \"{$commandName}\" generated",
            ["Command written to {$commandPath}"]
        );
    }
}

```

### Set Command Metadata in prooph board

Now we can switch to prooph board and set the following metadata in JSON format to the `AddBuilding` command:

```json
{
  "buildingId": "string",
  "name": "string"
}
```

:bulb: _Metadata can be set by opening the Metadata Sidebar (choose Metadata from top menu) and selecting the appropriate card or sticky note. Metadata changes are saved automatically._

Once metadata is set we can trigger Cody again ...

<a href="{{site.baseurl}}/assets/images/cody_tutorial_add_building_properties.gif" data-lightbox="Add-Building-Properties" data-title="Add Building Properties">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_add_building_properties.gif" />
</a>

... and validate the result by executing:

```bash
docker-compose run --rm composer exercise2
```

<a href="{{site.baseurl}}/assets/images/cody_tutorial_succeeding_exercise_2.png" data-lightbox="Succeeding-Exercise-II" data-title="Succeeding Exercise II">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_succeeding_exercise_2.png" />
</a>

Cards on a prooph board event map can have additional information set as metadata. By default metadata is stored in JSON format. Metadata itself is schemaless, meaning users are free to define any structure. The structure can be defined and even be type checked using [Metadata Templates](https://wiki.prooph-board.com/Card-Metadata#card-metadata-templates). In a Cody hook you have access to raw metadata and use it for advanced code generation.
{: .alert .alert-success}

## Exercise III

One last basic concept is missing to complete the picture.
On a prooph board event map you model message flows, behavior, business processes.
Different objects interact with each other by exchanging messages like commands and events.
A Cody Hook can make use of this information to assist developers by generating all required glue code if not a fully working implementation (depends on complexity).

We start again by looking at the failing test case for exercise III:

```bash
docker-compose run --rm composer exercise3
```

<a href="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_3.png" data-lightbox="Failing-Exercise-III" data-title="Failing Exercise III">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_3.png" />
</a>

Ok, this time we're asked to generate an aggregate class named `Building` with a method handling the `AddBuilding` command from previous exercises.

### Aggregate Hook

In Exercise I you've learned how to create a Command Hook and register it in `codyconfig.php`.
Do the same for an `AggregateHook` and let the hook generate an empty aggregate class. The class should be written to the directory `exercises/src/Aggregate`.

If you think the hook is ready, switch to prooph board, add an aggregate card with label `Building` on the event map and trigger Cody.

<a href="{{site.baseurl}}/assets/images/cody_tutorial_building_aggregate.gif" data-lightbox="Building-Aggregate" data-title="Building Aggregate">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_building_aggregate.gif" />
</a>

Did it work? You can verify the result by executing:

```bash
docker-compose run --rm composer exercise3
```

<a href="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_3_method_missing.png" data-lightbox="Failing-Exercise-III-Method-missing" data-title="Failing Exercise III Method missing">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_failing_exercise_3_method_missing.png" />
</a>

Test case is still failing but the error message has changed. `Building::addBuilding(AddBuilding $command)` method is still missing.

### Event Map Connections

Go back to the event map and draw an arrow from `AddBuilding` command to `Building` aggregate.

<a href="{{site.baseurl}}/assets/images/cody_tutorial_building_connect_command.gif" data-lightbox="Building-Connect-Command" data-title="Building Connect Command">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_building_connect_command.gif" />
</a>

The connection we've just drawn can be read in a hook. Here is the `Node` interface passed to a hook:

```php
<?php

/**
 * @see       https://github.com/event-engine/php-inspectio-graph-cody for the canonical source repository
 * @copyright https://github.com/event-engine/php-inspectio-graph-cody/blob/master/COPYRIGHT.md
 * @license   https://github.com/event-engine/php-inspectio-graph-cody/blob/master/LICENSE.md MIT License
 */

declare(strict_types=1);

namespace EventEngine\InspectioGraphCody;

interface Node
{
    public function id(): string;

    public function name(): string;

    public function type(): string;

    public function tags(): iterable;

    public function isLayer(): bool;

    public function isDefaultLayer(): bool;

    public function parent(): ?Node;

    /**
     * @return Node[]
     */
    public function children(): iterable;

    /**
     * @return Node[]
     */
    public function sources(): iterable;

    /**
     * @return Node[]
     */
    public function targets(): iterable;

    public function metadata(): ?string;
}

```

We already worked with `name()` and `metadata()`. From a `Node` you can follow connections using `sources()` and `targets()`. In our case the `AddBuilding` command node has the `Building` aggregate referenced as a target and from `Building` point of view `AddBuilding` command is a source.

**One important thing to note here is that a hook gets only access to directly connected nodes, even if those nodes have further connections!**
This avoids circular reference problems and keeps payload exchanged between prooph board and Cody small.
However, it's possible to request a full board sync and build up a node map in Cody. But this is an advanced topic, that should be covered later.
{: .alert .alert-info}

:bulb: _`Node` interface also provides information about `parent()` and `children()` which are useful when grouping cards in a [frame](https://wiki.prooph-board.com/board_workspace/Frames.html)_

Enough theory! Let's see it in action. Update your `AggregateHook` with this version:

```php
<?php
declare(strict_types=1);

namespace EventEngine\InspectioCody\Hook;

use EventEngine\InspectioCody\Board\BaseHook;
use EventEngine\InspectioCody\Http\Message\CodyResponse;
use EventEngine\InspectioCody\Http\Message\Response;
use EventEngine\InspectioGraph\VertexType;
use EventEngine\InspectioGraphCody\Node;
use LogicException;
use stdClass;
use function lcfirst;

final class AggregateHook extends BaseHook
{
    /**
     * @param  Node     $aggregate Information about aggregate sticky received from prooph board event map
     * @param  stdClass $context Context object populated in codyconfig.php
     * @return CodyResponse      Response sent back to prooph board, shown in Cody Console
     */
    public function __invoke(Node $aggregate, stdClass $context): CodyResponse
    {
        $aggregateName = $aggregate->name();
        $aggregateFile = $aggregateName . '.php';
        $aggregatePath = $context->path . '/Aggregate/' . $aggregateFile;


        $commandHandlingMethod = "";
        $includes = "";
        $command = null;

        foreach ($aggregate->sources() as $source) {
            if($source->type() === VertexType::TYPE_COMMAND) {
                if($command) {
                    throw new LogicException(
                        "Aggregate $aggregateName is connected to more than one command"
                    );
                }

                $command = $source;
            }
        }

        if($command) {
            $includes.= "use Cody\Tutorial\Command\\{$command->name()};\n";

            $methodName = lcfirst($command->name());

            $commandHandlingMethod =
                "public static function $methodName({$command->name()} \$command): void {}";
        }

        $code = <<<CODE
        <?php
        declare(strict_types=1);

        namespace Cody\Tutorial\Aggregate;

        $includes

        class $aggregateName
        {
            $commandHandlingMethod
        }
        CODE;

        $this->writeFile($code, $aggregatePath);

        return Response::fromCody(
            "Aggregate \"{$aggregateName}\" generated",
            ["Aggregate written to {$aggregatePath}"]
        );
    }
}

```

The implementation should be self explanatory.
We included a logical validation that an aggregate card should only have one command as a source.
If more than one is found an exception is thrown. Exceptions are caught by Cody and sent back to prooph board as an error response.
This way you can harden your hooks and validate event maps according to your own rules.

Trigger Cody with the `Building` aggregate card in prooph board and run exercise III once again:

```bash
docker-compose run --rm composer exercise3
```

<a href="{{site.baseurl}}/assets/images/cody_tutorial_succeeding_exercise_3.png" data-lightbox="Succeeding-Exercise-III" data-title="Succeeding Exercise III">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody_tutorial_succeeding_exercise_3.png" />
</a>

This exercise introduced the last basic building block: **Connections between cards**. Depending on arrow direction on prooph board a connected card appears either in the `sources` or `targets` collection of the `Node` passed to a hook. It's important to keep in mind that a hook only has access to directly connected cards.
{: .alert .alert-success}

## Exercise IV

Exercise IV coming soon!
{: .alert .alert-warning}

Meanwhile checkout these libraries for advanced code generation:

- [PHP prooph board Graph Cody](https://github.com/event-engine/php-inspectio-graph-cody): High-level abstraction for Cody nodes
- [Event Engine Code Generator](https://github.com/event-engine/php-code-generator-event-engine-ast): High-level abstraction for generating Event Engine code

And have a look at the example boards to learn more about working on prooph board:

- [Annotated prooph board Example](https://free.prooph-board.com/inspectio/boards/import/https%3A%2F%2Fraw.githubusercontent.com%2Fevent-engine%2Finspectio%2Fmaster%2Fassets%2FExample%2520Boards%2Fprooph board%2520Example.xml?temp=1)

- [Event Storming - The Picture](https://free.prooph-board.com/inspectio/boards/import/https%3A%2F%2Fraw.githubusercontent.com%2Fevent-engine%2Finspectio%2Fmaster%2Fassets%2FExample%2520Boards%2FThe%2520Picture.xml?temp=1)

- [Event Modeling Example](https://free.prooph-board.com/inspectio/boards/import/https%3A%2F%2Fraw.githubusercontent.com%2Fevent-engine%2Finspectio%2Fmaster%2Fassets%2FExample%2520Boards%2FEvent%2520Modeling.xml?temp=1)




