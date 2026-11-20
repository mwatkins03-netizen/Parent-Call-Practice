# Scenario data tools

`index.html` contains a generated block of scenario and parent-type data, between the
`BEGIN GENERATED DATA` and `END GENERATED DATA` comments. Don't edit that block by hand. Change the
sources here and rebuild.

- `content.json` holds the faculty's scenarios and parent types, extracted from the program's files.
  The title, Situation, Parent Reaction, Teacher Goal, and each parent type's name and description must
  appear in the app word for word. Don't fix or reword them.
- `authored.js` holds everything added for practice: parent and child names, grades, the caller's role,
  category, who starts the call, the suggested parent type, background details, extra AI instructions,
  AI behaviour prompts, Demo-mode lines, and avatars. Names and skin tones are spread across parent
  types and across positive and negative roles on purpose. Keep it that way.

## Workflow

From this folder (requires Node.js):

```
node build.js     # writes the data block into ../index.html
node verify.js    # confirms every faculty string appears verbatim (exits 1 on any mismatch)
```

1. Edit `authored.js` and/or `content.json`.
2. Run `node build.js`.
3. Run `node verify.js`.
4. Open `../index.html` in a browser and check the scenario you changed.
