UExperience App
=========================

Introduction
-----------------------

UExperience is a mobile app to research experience. 

More about the project can be found: [http://u-experience.org](http://u-experience.org)

The app is still in the alpha stage, so that means not all things work yet. This can lead to some unexpected problems.  

Installing the Program
-------------------

### Android simulator

The simulator can be run either from command line or through Android Studio. In terminal, this is done through the emulator @"name of simulator" command. Then, inside the folder with the program the command react-native run-android is run.

### iOS simulator

The iOS simulator can be run by opening subfolder ios/uexperience.xcodeproj in XCode. 

### Android Phone

Current version: [Version 0.0alpha2](https://sarajaksa.eu/content/code/2019/uexperience-2019-03-06.apk)

In some phone, in order to install the app, there permission for installing from unknown sources need to be allowed. This is in Settings > Security > Unknown Sources > Allow Installation of non-Market apps. In the rest of them, this is the questions, that will be posed while installing. 

The steps to install the app:

1. After downloading the app, the message will be shown, asking you, if you want to open it. Click open.
2. The question about installing from unknown sources will be shown. Click going to settings and then Allow from this source.
3. Click back. It will ask you, if you want to install the app. Click Install. 
4. The app is installed in the phone. 

Data Structure
---------------------

### Research Participant/App User

* email: string (email address of a research participant)
* passwordHash: string (SHA256 hash of a password, that the research participant is using to encrypt the data on their phone)
* time: string (the time in the day, that the research participant is available for research, which means that these are the time frames, where he is willing to accept beeps. The time used is the army time with conjunction, separated by coma (,) -> for example, to be available in the mornings and evenings, write it like that: 0900-1200,1800-2300)
* days: array with ISO dates in strings (the days, that the person is available for research - it is added automatically by research plan, but the user can always remove and add days)
* emailPassword: string (password for encrypting backups)

### Research Plan

* researchId: int/string (the id of research, that will differentiate it from other researches - there is still the open question, what system will be used for this)
* name: string (the name of the research - for example: Research of sexual fantasies)
* description: string (longer description of the research)
* organization: string (the organization overseeing the research)
* days: int (the number of days that the person would participate in the research)
* start: date (the start date of the research - the beeps can not be created for the time before that for this research)
* end: date (the end date of the research - the beeps can not be created for the time after that for this research)
* privacy: string (the description of what data is going to be used in this research)
* researcher: string (name and last name of the researcher)
* email: string (the email of the researcher responsible for this research)

* subjectId: int/string (subject id for this research)
* share: binary (when the user decides, that they want to share their data with researcher, then they can not change the research plan to make the data compatible. Otherwise they can.)
* password: string (password for encrypting emails sent to the researcher)

* beeps: JSON (criteria, based on which the beeps will be created):
    * additionalCriteria: binary (if true, then all the criteria needs to be true, for the beep to be created. If false, one type of the criteria needs to be true, for the beep to be created) - NOT YET IMPLEMENTED
    * importantMomentsOnly: binary (if this is true, then no beeps are created, and the user only writes down beeps that they find important)
    * dailyBeeps: int (creates the beeps based on the time, and it creates the number of beeps specified randomly in a given day)
    * location: GPS (creates beeps based on location, needs longitude and latitude)
    * phisiologicalData: critria for beeps (created beeps based on physiological data - NOT YET IMPLEMENTED)
    * push: binary (if the researcher can send beeps when he wants - NOT YET IMPLEMENTED)
    * person: personID (creates beeps, when a person in near or next to specific person - NOT YET IMPLEMENTED)
    * POSSIBLE TO ADD ADDITIONAL ONES

* audio: binary (if it is possible, to record an audio file instead of describing experience in text - NOT YET IMPLEMENTED)
* place: binary (does this research requires location - if not, no location data is collected)
* picture: binary (it is possible to take a picture as additional information for beeps for this research)
* descriptive: binary (is this research more descriptive - the main point being the describing experience through text, in contrast to there only being in advance formulated questions)

* questions: JSON array
    * id: int (the id of a question)
    * question: string (the text of the question, as it is asked of the research participant)
    * context: binary (if true, then this is a question about context - example: who are you with, and if false, then it is a question about experience - example: being present in the moment)
    * type: string (type of question. Currently available: binary, multiple choice, tags, tags without new tags (multiple choice with multiple answers possible), slider, free text)
    * possibleAnswers: array of strings (answers, necessary for tags without new tags and multiple choice)
    * current: binary (if true, then the question is visible to the research participant, if false, then it is not visiable)

### Beep

* time: datetime (the time of the beep start)
* latitude: GPS (only if location is tracked)
* longitude: GPS (only if location is tracked)
* experience: string/name audio file (description of the experience in the moment of the beep or the name of audio file, with the same)
* picture: string (uri for a picture file - if possible to add picture)
* beepType: time, location, important moment,... (check with research plan: Criteria for beeps for what is available)
* answers:
    * id: int (id of a question - as defined in the research plan)
    * answer: string/int (answer to the questions)

* sent: binary (were these beeps already sent to the researcher)

* transcription: string/file name
* analysis:
    * codes
        * name: string (the name of the code)
        * description: string (the description of the code)
        * agree: binary (do research participant agree with the description of the code)

