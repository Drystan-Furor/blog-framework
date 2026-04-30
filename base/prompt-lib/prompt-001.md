GIVEN
Intent = I want to build a static website hosted on github pages. I want to list articles my wife shares with me so I can catalogue what she thinks is important, it should be easy to browse.
while it is easy to duplicate and have a starter. while a folder of md files exist, it is transformed into html via scripts in the build pipeline

DO
Prepare = write document on recommended Astro folder structure + npm scripts in: docs/folder-structure.md,
follow recommended Astro folder structure + npm scripts.

ACT
input=base/essence.md (this is the read file for tasks)
memory=base/memories.md (use this to store memories)
handoff=base/handoffs.md (this is the write file for tasks, if you cannot perform certain tasks to 100% completion: draft a summary handoff, clearly structured)
output={
    turn everything into a proper prioritized backlog in: backlog/backlog.md,
    turn backlog/backlog.md into a proper roadmap in with WSJF scores + Epics in: backlog/roadmap/roadmap.md,
    turn backlog/roadmap/roadmap.md into a proper Sprint Planning in: backlog/sprint/sprint-planning.md,
    turn backlog/sprint/sprint-planning.md iteratively into sprints in: backlog/sprint/sprint1.md | backlog/sprint/sprint2.md | backlog/sprint/sprint3.md (create more sprintX.md files when needed),
    for each sprintX.md: 10 stories,
    for each story in backlog/sprint/sprint-planning.md: create a multi-spec driven tdd delivery user story with WSJF scores and refinement questions to be able to 100% the task as Agent,
},

ASSERT
intent is fulfilled.
input is read.
memory is updated.
handoff is updated.
output is written.
no drift between base/essence.md and backlog/backlog.md.
