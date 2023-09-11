# Contributing to TowneSpace

We strive to keep contributing to the TowneSquare ecosystem easy and transparent. Let us know if we are missing anything!

# Bug Reports

A bug report is a _demonstrable problem_ that is caused by the code in the repository. Finding a bug is extremely helpful in the development of our codebase, so thanks in advance!

Guidelines for bug reports:

1. Use the [GitHub Issue Search](https://github.com/TowneSquare/TowneSpace/issues) and check if the issue has already been reported.
2. Check if the issue has been fixed. Try to repoduce it using the latest [Main](https://github.com/TowneSquare/TowneSpace/tree/main) or [Dev](https://github.com/TowneSquare/TowneSpace/tree/dev) branch in the repository.
3. Isolate the problem - create a test case and live example.
4. Be as detailed and thorough as possible in your report. This should include specific information regarding the environment, operating system and version, browser and version, along with steps to repoduce the issue.

# Making Changes

### Pull Requests

Changes to the repository should happen through pull requests. The pull request workflow is as follows:

1. If you have added code that should be tested, add unit tests.
2. Ensure all tests and lints pass.
3. Add a meaningful title to your Pull Request.
4. Link any relevant issues, provide a clear description of what has been updated/added within the code.
5. Submit your pull request.

### Commits

Commits should be [atomic](https://en.wikipedia.org/wiki/Atomic_commit#Atomic_commit_convention) and broken down into logically separate changes.

Commit messages are important and incredibly helpful for others when they dig through the commit history in order to understand why a particular change was made and what problem it was intending to solve. For this reason commit messages should be well written. All commit messages should begin with a single short (50 character max) line summarizing the change and should skip the full stop. This is the title of the commit.

Following the commit title (unless it alone is self-explanatory), there should be a single blank line followed by the commit body which includes more detailed, explanatory text as separate paragraph(s). It is recommended that the commit body be wrapped at 72 characters so that Git has plenty of room to indent the text while still keeping everything under 80 characters overall.

The commit body should provide a meaningful commit message, which:

1. Explains the problem the change tries to solve, i.e. what is wrong with the current code without the change.
2. Justifies the way the change solves the problem, i.e. why the result with the change is better.
3. Alternative solutions considered but discarded, if any.

### Responding to Reviewer Feedback

During the review process a reviewer may ask you to make changes to your pull request. If a particular commit needs to be changed, that commit should be amended directly. Changes in response to a review _should not_ be made in separate commits on top of your PR unless it logically makes sense to have separate, distinct commits for those changes. This helps keep the commit history clean.

If your pull request is out-of-date and needs to be updated because `main` has advanced, you should rebase your branch on top of the latest main by doing the following:

```bash
git fetch upstream
git checkout topic
git rebase -i upstream/main
```

You _should not_ update your branch by merging the latest main into your branch. Merge commits included in PRs tend to make it more difficult for the reviewer to understand the change being made, especially if the merge wasn't clean and needed conflicts to be resolved. As such, PRs with merge commits will be rejected.
