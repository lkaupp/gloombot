# RAG Starter Example - GloomBot - Gloomhaven Rulebot
______

An example application for retrieval augmented generation (RAG) based on LlamaIndex and Llama3 for my students.

![](https://github.com/lkaupp/gloombot/blob/master/gloombot.gif)

Technology Stack:
* [LLamaIndex](https://www.llamaindex.ai/)
* [Ollama](https://ollama.com/)
* [Llama3](https://huggingface.co/docs/transformers/main/model_doc/llama3)
* [Flask](https://flask.palletsprojects.com/en/3.0.x/)
* [Angular](https://angular.io/)
* [Angular Material](https://material.angular.io/)

LLamaIndex is used with the regular SimpleDataLoader, and Vector Store (both can be improved by using Plugins or external vector databases). 
Ollama is used for hosting the Llama3 model which of course can be used standalone. Flask is the standard backend server, interacting with the Angular application 
over a super basic REST API. Angular 2+ and Material are used as frontend libraries (used a fraction of their capabilities only, 
IMHO Angular is the best enterprise frontend framework).

This is a simple chatbot based on the extracted Gloomhaven Rulebook, all rights on content belong to [Cephalofair](https://cephalofair.com/) and cannot
be used in any project without permission. This RAG project exists for the sole purpose of teaching my students the basic RAG concepts. 
No commercial intent at this point, just research. The chatbot allows you to ask rule questions according to the rulebook and the FAQ present.

In order to build your own chatbot on this starter example:
* Create the documents folder and insert the content
* Choose the right data loader or do the preprocessing yourself as exemplary shown in *extract.py*
* Place the preprocessed files in the preprocessed folder
* Install python requirements
* *cd gloombot-frontend* and do an *npm install*
* Run *flask run* in the root folder
* Run *ng serve* in the gloombot-frontend folder
* Find your frontend at http://localhost:4200 and ask your questions

License for the code is MIT so no warranties are given, use it at your own risk. All rights about the content (preprocessed file, 
and vector store) belong to [Cephalofair](https://cephalofair.com/). Cephalofair, if you ever read this, we could have a discussion,
how we can build this more professionally also for your other games.
