GIVEN
Intent = Now we have doen Sprint 1,2 and 3: filter work to be done versus work done, strip it from backlog + add to work-done.md, leave "work to be done" in the backlog

DO
Review and update= backlog/backlog.md

ACT
input=backlog/refined/sprint1-R.md | sprint2-R.md | sprint3-R.md  
memory=base/memories.md (use this to store memories)
handoff=base/handoffs.md (this is the write file for tasks, if you cannot perform certain tasks to 100% completion: draft a summary handoff, clearly structured)
output=backlog/backlog.md | backlog/work-done.md

ASSERT
intent is fulfilled.
input is read.
memory is updated.
handoff is updated.
output is written.
if a sprint story has proof of work, it is moved to work-done.md
backlog no longer contains stories that have been done in sprints


