'use client'

import Directory from "@/components/Directory";
import Workspace from "@/components/Workspace";
import { useState, useEffect } from "react";
import { Note } from "@/types";

var graphqlPopulateWorkspace = `query GetNote($id: Int!) {
  	getNoteById(id: $id) {
		title
		content
  }
}`;

var graphqlPopulateDirectory = `query GetNotes {
	getAllNotes {
		id
		title
		content
  }
}`;

var graphqlUpdateNote = `mutation UpdateNote($id: Int!, $title: String!, $content: String) {
	updateNote(id: $id, data: { title: $title, content: $content }) {
		title
		content
	}
}`;

var graphqlDeleteNote = `mutation DeleteNote($id: Int!) {
	deleteNote(id: $id) {
		content
		id
		title
	}
}`;

var graphqlCreateNote = `mutation CreateNote($title: String!) {
	createNote(title: $title) {
		id
		title
		content
	}
}`

export default function Home() {
	const [userNotes, setUserNotes] = useState<Array<Note>>()
	const [currentNoteId, setCurrentNoteId] = useState<number>()
	const [titleBody, setTitleBody] = useState<string>();
	const [contentBody, setContentBody] = useState<string>();

	const loadDirectory = async () => {
		debugger;
		let response = await fetch("/api/graphql", {
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			},
			body: JSON.stringify({
				query: graphqlPopulateDirectory
			}),
		})

		let body = await response.json();
		setUserNotes(body.data.getAllNotes)
	}

	const loadNote = async () => {
		let response = await fetch("/api/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: graphqlPopulateWorkspace,
				variables: { id: Number(currentNoteId) }
			}),
		})

		let body = await response.json();
		let note = body.data.getNoteById;
		setTitleBody(note.title)
		setContentBody(note.content)
	}

	const saveNote = async () => {
		let response = await fetch("/api/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: graphqlUpdateNote,
				variables: { id: Number(currentNoteId), title: titleBody, content: contentBody }
			}),
		})

		let body = await response.json();
		let note = body.data.updateNote;
		setTitleBody(note.title)
		setContentBody(note.content)
		loadDirectory()	
	}

	const deleteNote = async () => {
		debugger;
		let response = await fetch("/api/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: graphqlDeleteNote,
				variables: { id: Number(currentNoteId) }
			}),
		})

		setCurrentNoteId(undefined)
		setTitleBody(undefined)
		setContentBody(undefined)
		loadDirectory()	
	}

	const createNote = async () => {
		debugger;
		let response = await fetch("/api/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: graphqlCreateNote,
				variables: { title: "New Note Title" }
			}),
		})

		let body = await response.json();
		let note = body.data.createNote;
		setCurrentNoteId(note.id)
		setTitleBody(note.title)
		setContentBody(note.content)
		loadDirectory()	
	}

	useEffect(() => {
		loadDirectory()
	}, [])

	useEffect(() => {
		if (currentNoteId) {
			loadNote()
		}
	}, [currentNoteId])

	return (
		<div className="flex flex-row h-screen">
			<div className="w-1/4 h-full">
				<Directory 
					userNotes={userNotes}
					selectionCallback={setCurrentNoteId} 
					createNote={createNote}
				/>
			</div>
			<div className="w-3/4 h-[calc(100vh-10px)]">
				<Workspace 
					titleBody={titleBody} 
					setTitleBody={setTitleBody}
					contentBody={contentBody}
					setContentBody={setContentBody}
					saveNote={saveNote}
					deleteNote={deleteNote}
				/>
			</div>
		</div>
	);
}
