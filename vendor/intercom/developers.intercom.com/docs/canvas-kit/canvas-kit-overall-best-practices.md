# Canvas Kit Best Practices

## Ensure your app has a purpose within Intercom

Apps built with the Framework are intended to be extensions of your product. These may take users outside of Intercom in some scenarios, but they should always aim to successfully achieve an outcome by utilizing your service within Intercom first. Answer these questions to get a sense of the jobs you want your app to solve:

- What problems do my customers face when they're using my app alongside Intercom?
- What context would be beneficial for my customers / their end users to have?
- What information would be beneficial for my customers / their end users to know?
- What actions would be beneficial for my customers / their end users to take?


## Storyboard the flows of your app

Your app's job is to guide your users toward a specific outcome, like starting a video call or subscribing to your newsletter. Before you start building your app, you should storyboard your app's interactions:

- Map out a clear start, middle and end state for your app.
- Minimize the number of steps users need to take to complete a task. For example, instead of showing a button that leads to a form, show the form from the start.


## Consider your grammar, language and tone

When it comes to writing copy for your app, there are several things to take into consideration; who your users are, what prior knowledge of your product's concepts they have, and their level of English proficiency are to name but a few. Here's some guidance to avoid issues with your descriptive text:

- Consider if each term you use clearly describes the concept in the simplest way.
- Avoid synonyms for the same concept in place of a singular word or phrase.
- Avoid using terminology that's industry or product specific where it wouldn't naturally sit.
- Use simple, small, common words that everyone will understand, regardless of their native language.
- Ensure words are not repeated within the same text component.
- Steer clear of jargon or in-jokes that the majority of users won't grasp.
- Focus on making your text easy to understand on a first glance. For example, use bold text to highlight important aspects in larger paragraphs.
- Get others to read your copy - a second opinion will help to make it both more human and readable.
- Do not disguise your app as a human or company. Language can be empathetic, but identifiable as a non-human entity. Avoid "I" and "We".


![App docs - Brand personality](/assets/6b4d99f-apps_docs__brand_personality.804fd1a5127ad1dff68182933396ff28b9416b5c2d82980af1bcf54618460b4b.71a4f21c.jpg)

It's also worth considering what your users are there to do - no matter the end goal, the bottom-line is that all apps on Intercom should get users to the outcome they desire. To achieve this, you need to ensure your actionable language follows some rules:

- Make your call to actions shorter, more direct, and super clear about what happens next when a user takes the action.
- Be brief and give the instructions your users need in as few words as possible.
- Provide all the context users need to complete each step in your app. For example, if you have an app that allows users to request a demo with your team, your button should say 'Request a demo' instead of 'Let's do this.'


![App docs - Provide context](/assets/d0fb59e-apps_docs_provide_context.1704e857f08e297b1e7f66eff7b9669fb43e429f50bfe7f191454a96f5570aae.71a4f21c.jpg)

- Use the active voice for when something needs to be done.
  - Speak authoritatively by beginning sentences with imperative verbs.
  - Cut permissive words and be direct with commands.
  - Encourage action to take place.
  - Examples: 'Book an appointment', 'Play podcast' or 'Check on your recent orders.'


![App docs - Active voice](/assets/ac6d65b-apps_docs_active_voice.c77701fe8103465d0a2884e8dfcf2b5cecc2db4ac387c4cfb8449fa0f5be102c.71a4f21c.jpg)

## Keep the experience consistent

Your app should be consistent across its entire flow, and keep consistency with other apps in our ecosystem. The experience should feel familiar without significant difference from one app, or section within an app, to another.

- Components are designed to accommodate particular jobs. Think about what you're trying to achieve and use those that suit the experience best.
- Consistently use the same components to solve similar or common patterns and interactions throughout your app.
- Look at our App Store for examples on how existing apps within your given category achieve their workflows.
- Use the same terminology throughout to describe the same concepts.


## Handle errors correctly

There's bound to be times when your app runs into issues. It's important that the user of your app is both aware of the problem and can understand what's happened.

- Be as clear and as specific as possible by providing as much information in as few words.
- Explain any solutions, and provide guidance on next steps. This could be troubleshooting information, or an action which can solve the issue faster.
- Keep error messages close to where the issue lies, and always provide one.
- For the text component, change the style to error. This will highlight the text in red.
- For interactive components, change the style to failed. This will highlight the component in red.


## Authenticate and provide settings in the appropriate place

When your app requires users to authenticate with your service, or you want users of your app to select settings and customize certain features before using the app, there's a few things to consider:

- Teammates should authenticate with your service during installation. This should happen after they go through the Intercom OAuth flow, but it can also happen beforehand if there's a good use case.
- When a teammate installs your app, this will authenticate all teammates within the Intercom workspace to access and use your app.
- If your service needs to individually authenticate each of the individual teammates in Intercom, you should:
  - First use the Admin API and attempt to map Intercom teammates with your users.
  - If this won't work, allow the teammate to authenticate within the first canvas of your app upon adding it (ie. the configure flow for Messenger, and the initialize flow for Inbox).
- Settings which impact every user of the app in the workspace should never live directly within the app. Only provide settings specific to that teammate or single-use flow itself.
- Consider adding an onboarding flow after a user has authenticated and before you redirect back to the App Store, providing clarity and direction on how the app works, alongside any configurable settings.