import logging
import sys

from flask import Flask, request

import os

from flask_cors import CORS
from llama_index.core import (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext, load_index_from_storage, Settings, PromptTemplate, PromptHelper, ServiceContext,
)
from llama_index.core.embeddings import resolve_embed_model
from llama_index.llms.ollama import Ollama


import ollama
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
app = Flask(__name__)
CORS(app)
index = None


def initialize_index():
    global index

    storage_context = StorageContext.from_defaults(persist_dir="storage")


    Settings.embed_model = resolve_embed_model("local:sentence-transformers/all-mpnet-base-v2")

    # ollama
    llm = Ollama(model="llama3", request_timeout=30.0)
    Settings.llm = llm

    if  os.listdir("storage") != []:
        index = load_index_from_storage(storage_context)
    else:
        documents = SimpleDirectoryReader("preprocessed").load_data()
        index = VectorStoreIndex.from_documents(
            documents, storage_context=storage_context
        )
        storage_context.persist()

@app.route("/query", methods=["GET"])
def query_index():
    global index
    query_text = request.args.get("text", None)
    if query_text is None:
        return (
            "No text found, please include a ?text=blah parameter in the URL",
            400,
        )
    query_engine = index.as_query_engine()
    response = query_engine.query(query_text)
    return str(response), 200

initialize_index()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5601)
