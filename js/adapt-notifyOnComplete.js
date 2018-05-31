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

        if (Adapt.course.get("_isComplete")) {
            return;
        }

        var notifyConfig = pageModel.get("_notifyOnComplete");

        Adapt.trigger("notify:push", {
            title: notifyConfig.title,
            body: notifyConfig.body,
            _timeout: 5000,
            _callbackEvent: "navigation:backButton"
        });

    }

    function onCourseComplete(courseModel) {

        var assessment = courseModel.get("_assessment");

        if (assessment && assessment._requireAssessmentPassed && !courseModel.get("_isAssessmentPassed")) return;

        var notifyConfig = courseModel.get("_notifyOnComplete");

        Adapt.trigger("notify:popup", {
            title: notifyConfig.title,
            body: notifyConfig.body
        });
    }

    Adapt.once("app:dataLoaded", onDataReady);
});
