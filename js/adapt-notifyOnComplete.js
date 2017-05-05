define([
    "core/js/adapt",
    "backbone"
], function(Adapt, Backbone) {

    function onDataReady() {
        var isEnabledOnCourse = isNotifyEnabled(Adapt.course);
        if (isEnabledOnCourse) {
            Adapt.listenTo(Adapt.course, "change:_isComplete", onCourseComplete);
        }

        _.each(Adapt.contentObjects.models, function(model) {
            if (isNotifyEnabled(model)) {
                Adapt.listenTo(model, "change:_isComplete", onContentObjectComplete);
            }
        });
    }

    function isNotifyEnabled(model) {
        return model.get("_notifyOnComplete") && model.get("_notifyOnComplete")._isEnabled;
    }

    function onContentObjectComplete(pageModel) {
        if (!Adapt.course.get("_isComplete")) {
            new NotifyOnCompleteView({model: pageModel}).$el.appendTo(".page");
        }
    }

    function onCourseComplete(courseModel) {
        var assessment = courseModel.get("_assessment");

        if (assessment && assessment._requireAssessmentPassed && !courseModel.get("_isAssessmentPassed")) return;

        Adapt.trigger("notify:popup", {
            title: notify.title,
            body: notify.body
        });
    }

    var NotifyOnCompleteView = Backbone.View.extend({

        events: {
            "click .notifyoncomplete-button": "onButtonClicked"
        },

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        render: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates['notifyOnComplete'];
            this.$el.html(template(data));
            return this;
        },

        onButtonClicked: function() {
            Backbone.history.navigate('#', {trigger:true});
        }
    });

    Adapt.once("app:dataLoaded", onDataReady);
});