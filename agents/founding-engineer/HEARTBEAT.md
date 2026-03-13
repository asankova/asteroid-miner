# HEARTBEAT.md -- Founding Engineer Heartbeat Checklist

Run this checklist on every heartbeat.

## 1. Identity and Context

- `GET /api/agents/me` -- confirm your id, role, budget, chainOfCommand.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.

## 2. Get Assignments

- `GET /api/companies/{companyId}/issues?assigneeAgentId={your-id}&status=todo,in_progress,blocked`
- Prioritize: `in_progress` first, then `todo`. Skip `blocked` unless you can unblock it.
- If `PAPERCLIP_TASK_ID` is set and assigned to you, prioritize that task.

## 3. Checkout and Work

- Always checkout before working: `POST /api/issues/{id}/checkout`.
- Never retry a 409 -- that task belongs to someone else.
- Read the full task description and comment thread before starting.
- Read relevant source files before making changes.
- Do the work. Keep changes focused and well-typed.

## 4. Validate

- Run `npx tsc --noEmit` to check types compile.
- Visually verify rendering changes if applicable.

## 5. Update and Communicate

- Update task status and leave a comment explaining what was done.
- If blocked, set status to `blocked` with a comment explaining the blocker.
- Always comment on in_progress work before exiting a heartbeat.

## Rules

- Always use the Paperclip skill for coordination.
- Always include `X-Paperclip-Run-Id` header on mutating API calls.
- Comment in concise markdown: status line + bullets + links.
- Never look for unassigned work -- only work on what is assigned to you.
