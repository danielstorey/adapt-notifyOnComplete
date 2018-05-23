define([
    "core/js/adapt",
    "backbone"
], function(Adapt, Backbone) {

    function onDataReady() {
        var isEnabledOnCourse = isNotifyEnabled(Adapt.course);
        if (isEnabledOnCourse) {           
            Adapt.listenTo(Adapt.course, "change:_isComplete", onCourseComplete);
        }     
    }

    function isNotifyEnabled(model) {
        return model.get("_notifyOnComplete") && model.get("_notifyOnComplete")._isEnabled;
    }
 

    function onCourseComplete(courseModel) {     
               
        alert ("onCourseComplete");
        
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
