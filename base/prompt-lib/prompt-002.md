GIVEN
Intent = I want to build a static website hosted on github pages. I want to list articles my wife shares with me so I can catalogue what she thinks is important, it should be easy to browse.
while it is easy to duplicate and have a starter. while a folder of md files exist, it is transformed into html via scripts in the build pipeline

DO
Prepare = draft TDD spec-driven user stories with acceptance criteria, validations, about sprint1.md

ACT
input=backlog/sprint/sprint1.md
memory=base/memories.md (use this to store memories)
handoff=base/handoffs.md (this is the write file for tasks, if you cannot perform certain tasks to 100% completion: draft a summary handoff, clearly structured)
output=backlog/refined/sprint1-R.md

ASSERT
intent is fulfilled.
input is read.
memory is updated.
handoff is updated.
output is written.

