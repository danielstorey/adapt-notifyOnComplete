# adapt-dragndrop

**Notify on Complete** is an *extension* for the Adapt Framework created by Dan storey.

When the learner completes a content object a push notification appears. When enabled on the course itself a notification popup appears when the course is complete and any required assessments are passed. 

##Installation

## Settings Overview

The attributes listed below are used in *course.json* and *contentObjects.json* to configure **Notify on Complete**, and are properly formatted as JSON in [*example.json*](https://github.com/danielstorey/adapt-notifyOnComplete/example.json).

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_isEnabled** (boolean): Enable the extension on the course or a content object

**_title** (string): The title to display for the notification

**_body** (string): The body text to display for the notification.
*If applying this to a content object this text should advise the user that clicking the notification will take them back to the menu.*

### Limitations

No known limitations

----------------------------
**Version number:**  1.0.2
**Framework versions:**  2.0
**Author / maintainer:** Dan Storey
