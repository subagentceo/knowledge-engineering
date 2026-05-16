# Arkose Labs Accessibility Conformance Report

International Edition; based on VPAT® Version 2.5

# Introduction

## Product Information

**Name of Product/Version:** Arkose Labs Enforcement Challenge

**Report Date:** November 2024

**Product Description:** Arkose Bot Manager allows application development and security teams to protect their apps and users against bot-driven and related attacks. When suspicious signals are detected, web traffic can be sent through the proprietary challenge-response technology of Arkose Labs Enforcement Challenge, including Arkose MatchKey, to validate malicious intent. Targeted attack response allows good users to pass uninterrupted, while suspicious traffic is met with a game-like enforcement challenge that bots and fraudulent actors cannot efficiently solve.

**Contact Information:** [support@arkoselabs.com](mailto:\[support@arkoselabs.com])

**Notes:** This report covers the following Enforcement Challenge variants and versions:

* all current game types Match Key Game, Tile Game, and Audio Game

* on the current [Enforcement Challenge UI 2.0](https://developer.arkoselabs.com/docs/new-enforcement-challenge-ui)

This report does not extend to legacy versions of our product, such as the legacy Enforcement Challenge UI 1.0, obsolete game types not listed above, or fallback mode render types.

WCAG compliance certificates as well as demo links for the covered game types are available to our customers upon request. Please reach out to your customer service representative.

**Evaluation Methods Used:** The following methods and technologies were used for evaluation:

* Screen readers, according to the matrix of [supported screen reader/browser combinations](https://developer.arkoselabs.com/docs/assistive-technology-support), to evaluate the experience for users who are blind or have low vision.

* Keyboard access, to simulate the experience of a user with a mobility impairment, or who is blind.

* ZoomText and browser zoom, to test the experience of users with low vision who might magnify the screen.

* Color inversion, to identify issues for color blind, low vision or cognitively impaired users.

* Manual testing, supplemented with automated testing using ARC Toolkit and others

* User testing, conducted on a subset of challenge types and a subset of impairment types.

Evaluation, user testing, and WCAG certification was conducted by accessibility experts at [me2 accessibility PTY LTD](http://www.me2accessibility.com.au/).

## **Applicable Standards/Guidelines**

This report covers the degree of conformance for the following accessibility standard/guidelines:

<Table>
  <thead>
    <tr>
      <th>
        Standard/Guideline
      </th>

      <th>
        Included In Report
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/2008/REC-WCAG20-20081211/)
      </td>

      <td>
        · Level A (Yes)\
        · Level AA (Yes)\
        · Level AAA (No)
      </td>
    </tr>

    <tr>
      <td>
        [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21)
      </td>

      <td>
        · Level A (Yes)\
        · Level AA (Yes)\
        · Level AAA (No)
      </td>
    </tr>

    <tr>
      <td>
        [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22)
      </td>

      <td>
        · Level A (Yes)\
        · Level AA (Yes)\
        · Level AAA (No)
      </td>
    </tr>

    <tr>
      <td>
        [Revised Section 508 standards published January 18, 2017 and corrected January 22, 2018](https://www.access-board.gov/ict/) 
      </td>

      <td>
        ·(Yes)
      </td>
    </tr>

    <tr>
      <td>
        [EN 301 549 Accessibility requirements for ICT products and services - V3.1.1 (2019-11)](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.01.01_60/en_301549v030101p.pdf)  **and**[EN 301 549 Accessibility requirements for ICT products and services - V3.2.1 (2021-03)](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf)
      </td>

      <td>
        ·(Yes)
      </td>
    </tr>
  </tbody>
</Table>

## **Terms**

The terms used in the Conformance Level information are defined as follows:

* Supports: The functionality of the product has at least one method that meets the criterion without known defects or meets with equivalent facilitation.
* Partially Supports: Some functionality of the product does not meet the criterion.
* Does Not Support: The majority of product functionality does not meet the criterion.
* Not Applicable: The criterion is not relevant to the product.

# WCAG 2.x Report

Tables 1 and 2 in this WCAG 2.x report also document conformance with:

* EN 301 549:  Chapter 9 - Web, Sections 10.1-10.4 of Chapter 10 - Non-Web documents, and Sections 11.1-11.4 and 11.8.2 of Chapter 11 - Non-Web Software (open and closed functionality), and Sections 12.1.2 and 12.2.4 of Chapter 12 – Documentation
* Revised Section 508: Chapter 5 – 501.1 Scope, 504.2 Content Creation or Editing, and Chapter 6 – 602.3 Electronic Support Documentation.

**Note:** When reporting on conformance with the WCAG 2.x Success Criteria, they are scoped for full pages, complete processes, and accessibility-supported ways of using technology as documented in the [WCAG 2.0 Conformance Requirements](https://www.w3.org/TR/WCAG20/#conformance-reqs).

## Table 1: Success Criteria, Level A

Notes: The stated conformance level refers to the **web** aspect, as the Enforcement Challenge is a web-only applet embedded in the customer’s web page or app, without end user documentation. Other aspects (docs, software, authoring tool) therefore do not apply.

<Table>
  <thead>
    <tr>
      <th>
        Criteria
      </th>

      <th>
        Conformance Level
      </th>

      <th>
        Remarks and Explanations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [**1.1.1 Non-text Content**](http://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A)
        Also applies to:

        EN 301 549 Criteria
        ·    	9.1.1.1 (Web)
        ·    	10.1.1.1 (Non-web document)
        ·    	11.1.1.1.1 (Open Functionality Software)
        ·    	11.1.1.1.2 (Closed Functionality Software)
        ·    	11.8.2 (Authoring Tool)
        ·    	12.1.2 (Product Docs)
        ·    	12.2.4 (Support Docs)

        Revised Section 508
        ·    	501 (Web)(Software)
        ·    	504.2 (Authoring Tool)
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge provides text alternatives for all non-text content.

        Exceptions:

        · Decorative images may have empty alt text attributes, to allow assistive technologies to ignore them. This is in line with WCAG best practices.

        · Challenge images provide only minimal information in alt text, to not invalidate their security purpose. Users have the option to switch to an audio challenge instead. This is an explicitly allowed “CAPTCHA” exception as per WCAG success criterion definitions.
      </td>
    </tr>

    <tr>
      <td>
        [**1.2.1 Audio-only and Video-only (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.2.1 (Web)\
        ·    	10.1.2.1 (Non-web document)\
        ·    	11.1.2.1.1 (Open Functionality Software)\
        ·    	11.1.2.1.2.1 and 11.1.2.1.2.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool) ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The audio challenge does not provide an alternative that presents equivalent information, to not invalidate their security purpose. However, an alternative for the audio challenge is provided via the visual challenge.
      </td>
    </tr>

    <tr>
      <td>
        [**1.2.2 Captions (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-captions) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.2.2 (Web)\
        ·    	10.1.2.2 (Non-web document)\
        ·    	11.1.2.2 (Open Functionality Software)\
        ·    	11.1.2.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        Audio files used for audio challenges generally do not constitute of spoken words that would require captions.
      </td>
    </tr>

    <tr>
      <td>
        [**1.2.3 Audio Description or Media Alternative (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.2.3 (Web)\
        ·    	10.1.2.3 (Non-web document)\
        ·    	11.1.2.3.1 (Open Functionality Software)\
        ·    	11.1.2.3.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenges do not play any video content that would require audio description or a media alternative.
      </td>
    </tr>

    <tr>
      <td>
        [**1.3.1 Info and Relationships**](http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.3.1 (Web)\
        ·    	10.1.3.1 (Non-web document)\
        ·    	11.1.3.1.1 (Open Functionality Software)\
        ·    	11.1.3.1.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·       602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge user interface allows information and relationships to be programmatically determined.
      </td>
    </tr>

    <tr>
      <td>
        [**1.3.2 Meaningful Sequence**](http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.3.2 (Web)\
        ·    	10.1.3.2 (Non-web document)\
        ·    	11.1.3.2.1 (Open Functionality Software)\
        ·    	11.1.3.2.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge user interface presents elements in a logical and intuitive reading and navigation order.
      </td>
    </tr>

    <tr>
      <td>
        [**1.3.3 Sensory Characteristics**](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.3.3 (Web)\
        ·    	10.1.3.3 (Non-web document)\
        ·    	11.1.3.3 (Open Functionality Software)\
        ·    	11.1.3.3 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge user interface does not rely on a single type of sensory characteristics alone to communicate information.

        Where specific sensory information is necessary to determine the correct answer to a challenge (e.g. to identify an image), there is always an alternative for the user to switch to (e.g. opting for the audio challenge instead of visual).
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.1 Use of Color**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.1 (Web)\
        ·    	10.1.4.1 (Non-web document)\
        ·    	11.1.4.1 (Open Functionality Software)\
        ·    	11.1.4.1 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not use color as the only visual means of conveying information.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.2 Audio Control**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.2 (Web)\
        ·    	10.1.4.2 (Non-web document)\
        ·    	11.1.4.2 (Open Functionality Software)\
        ·    	11.1.4.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The audio challenge allows the user full control over the audio playback via play/pause button.
      </td>
    </tr>

    <tr>
      <td>
        [**2.1.1 Keyboard**](http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.1.1 (Web)\
        ·    	10.2.1.1 (Non-web document)\
        ·    	11.2.1.1.1 (Open Functionality Software)\
        ·    	11.2.1.1.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is fully operable via keyboard.
      </td>
    </tr>

    <tr>
      <td>
        [**2.1.2 No Keyboard Trap**](http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A) Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.1.2 (Web)\
        ·    	10.2.1.2 (Non-web document)\
        ·    	11.2.1.2 (Open Functionality Software)\
        ·    	11.2.1.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not present instances where a keyboard user could not navigate away from an area with a keyboard.

        If the Enforcement Challenge is implemented as a modal dialog box, the dialog box traps the keyboard focus, but allows the user to dismiss the dialog via keyboard.
      </td>
    </tr>

    <tr>
      <td>
        [**2.1.4 Character Key Shortcuts**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.1.4 (Web)\
        ·    	10.2.1.4 (Non-web document)\
        ·    	11.2.1.4.1 (Open Functionality Software)\
        ·    	11.2.1.4.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not use printable key keyboard shortcuts.
      </td>
    </tr>

    <tr>
      <td>
        [**2.2.1 Timing Adjustable**](http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.2.1 (Web)\
        ·    	10.2.2.1 (Non-web document)\
        ·    	11.2.2.1 (Open Functionality Software)\
        ·    	11.2.2.1 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge generally does not set any time limits on user interactions.

        Exceptions:

        · Known fraudulent traffic may have time limits enforced for submitting answers to the challenge. As this is limited to a subset of known fraud traffic, ordinary users will not encounter these time limits.

        · Where content is displayed only temporarily, the same information can be obtained elsewhere on the challenge (e.g. progress indicator) or on the customer’s hosting page (e.g. success screen).

        · Both above cases constitute an explicitly allowed essential exception as per WCAG success criterion definitions, as these timings are an essential feature of our challenge technology and would otherwise invalidate the activity.
      </td>
    </tr>

    <tr>
      <td>
        [**2.2.2 Pause, Stop, Hide**](http://www.w3.org/TR/WCAG20/#time-limits-pause) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.2.2 (Web)\
        ·    	10.2.2.2 (Non-web document)\
        ·    	11.2.2.2 (Open Functionality Software)\
        ·    	11.2.2.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The visual challenge may use animated images on the retry screen, to illustrate the correct and incorrect example images. These animations stop automatically after a maximum of 5 seconds.
      </td>
    </tr>

    <tr>
      <td>
        [**2.3.1 Three Flashes or Below Threshold**](http://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.3.1 (Web)\
        ·    	10.2.3.1 (Non-web document)\
        ·    	11.2.3.1 (Open Functionality Software)\
        ·    	11.2.3.1 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not use any flashing effects in the user interface nor the challenge images.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.1 Bypass Blocks**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.4.1 (Web)\
        ·    	10.2.4.1 (Non-web document) – Does not apply\
        ·    	11.2.4.1 (Open Functionality Software) – Does not apply\
        ·    	11.2.4.1 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software) – Does not apply to non-web software\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs) – Does not apply to non-web docs
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not contain any repeated blocks of content.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.2 Page Titled**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.4.2 (Web)\
        ·    	10.2.4.2 (Non-web document)\
        ·    	11.2.4.2 (Open Functionality Software) - Does not apply\
        ·    	11.2.4.2 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge is not a webpage, but an applet embedded within an iframe on the customer’s page.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.3 Focus Order**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.4.3 (Web)\
        ·    	10.2.4.3 (Non-web document)\
        ·    	11.2.4.3 (Open Functionality Software)\
        ·    	11.2.4.3 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge uses a focus order that is logical and preserves meaning and operability.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.4 Link Purpose (In Context)**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.4.4 (Web)\
        ·    	10.2.4.4 (Non-web document)\
        ·    	11.2.4.4 (Open Functionality Software)\
        ·    	11.2.4.4 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not contain any hyperlinks.
      </td>
    </tr>

    <tr>
      <td>
        [**2.5.1 Pointer Gestures**](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.5.1 (Web)\
        ·    	10.2.5.1 (Non-web document)\
        ·    	11.2.5.1 (Open Functionality Software)\
        ·    	11.2.5.1 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not use multipoint or path-based gestures for operation.
      </td>
    </tr>

    <tr>
      <td>
        [**2.5.2 Pointer Cancellation**](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.5.2 (Web)\
        ·    	10.2.5.2 (Non-web document)\
        ·    	11.2.5.2 (Open Functionality Software)\
        ·    	11.2.5.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not use the down-event of the pointer to execute any function.
      </td>
    </tr>

    <tr>
      <td>
        [**2.5.3 Label in Name**](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.5.3 (Web)\
        ·    	10.2.5.3 (Non-web document)\
        ·    	11.2.5.3.1 (Open Functionality Software)\
        ·    	11.2.5.3.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        Where the Enforcement Challenge uses icons with visible labels, those labels match the name of the same element.
      </td>
    </tr>

    <tr>
      <td>
        [**2.5.4 Motion Actuation**](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.5.4 (Web)\
        ·    	10.2.5.4 (Non-web document)\
        ·    	11.2.5.4 (Open Functionality Software)\
        ·    	11.2.5.4 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not use motion actuation in any of their challenges or user interfaces.
      </td>
    </tr>

    <tr>
      <td>
        [**3.1.1 Language of Page**](http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A) Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.1.1 (Web)\
        ·    	10.3.1.1 (Non-web document)\
        ·    	11.3.1.1.1 (Open Functionality Software)\
        ·    	11.3.1.1.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge generally uses the browser's language setting to determine which language to present the user interface in. The selected language is specified in the document language in the HTML markup.
      </td>
    </tr>

    <tr>
      <td>
        [**3.2.1 On Focus**](http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.2.1 (Web)\
        ·    	10.3.2.1 (Non-web document)\
        ·    	11.3.2.1 (Open Functionality Software)\
        ·    	11.3.2.1 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not contain any elements that would cause a change of context when focused.
      </td>
    </tr>

    <tr>
      <td>
        [**3.2.2 On Input**](http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.2.2 (Web)\
        ·    	10.3.2.2 (Non-web document)\
        ·    	11.3.2.2 (Open Functionality Software)\
        ·    	11.3.2.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not contain any input elements that would cause a change of context when receiving input.
      </td>
    </tr>

    <tr>
      <td>
        [**3.2.6 Consistent Help**](https://www.w3.org/TR/WCAG22/#consistent-help) (Level A 2.2 only)\
        Also applies to:

        EN 301 549 Criteria – Does not apply

        Revised Section 508 – Does not apply
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not offer any of the mentioned help mechanisms (human contact details, human contact mechanism, self-help option, a fully automated contact mechanism).
      </td>
    </tr>

    <tr>
      <td>
        [**3.3.1 Error Identification**](http://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.3.1 (Web)\
        ·    	10.3.3.1 (Non-web document)\
        ·    	11.3.3.1.1 (Open Functionality Software)\
        ·    	11.3.3.1.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The visual challenge provides a retry screen if the user submits an incorrect answer, informing the user of the incorrect answer, providing further text based and image based solve hints, and inviting them to retry.

        The audio challenge provides descriptive text based error messages if the user submits an incorrect answer or submits invalid characters. Both retry screens and error messages are automatically focused and announced by screen readers as expected.
      </td>
    </tr>

    <tr>
      <td>
        [**3.3.2 Labels or Instructions**](http://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.3.2 (Web)\
        ·    	10.3.3.2 (Non-web document)\
        ·    	11.3.3.2 (Open Functionality Software)\
        ·    	11.3.3.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The audio challenge provides clear instructions and labels to guide the user towards entering the answer into the text input field.
      </td>
    </tr>

    <tr>
      <td>
        [**3.3.7 Redundant Entry**](https://www.w3.org/TR/WCAG22/#redundant-entry) (Level A 2.2 only)\
        Also applies to:

        EN 301 549 Criteria – Does not apply

        Revised Section 508 – Does not apply
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not require the user to enter the exact same information multiple times.
      </td>
    </tr>

    <tr>
      <td>
        [**4.1.1 Parsing**](http://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A)\
        Applies to:

        WCAG 2.0 and 2.1 – Always answer ‘Supports’

        WCAG 2.2 (obsolete and removed) - Does not apply

        Also applies to:

        EN 301 549 Criteria\
        ·    	9.4.1.1 (Web)\
        ·    	10.4.1.1 (Non-web document)\
        ·    	11.4.1.1.1 (Open Functionality Software)\
        ·    	11.4.1.1.2 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge’s markup content follows the language specification without significant validation errors.

        Further: For WCAG 2.0, 2.1, and Revised 508 Standards, the September 2023 errata update indicates this criterion is always supported. See the [WCAG 2.0 Editorial Errata](https://www.w3.org/WAI/WCAG20/errata/#editorial) and the [WCAG 2.1 Editorial Errata](https://www.w3.org/WAI/WCAG21/errata/#editorial).
      </td>
    </tr>

    <tr>
      <td>
        [**4.1.2 Name, Role, Value**](http://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.4.1.2 (Web)\
        ·    	10.4.1.2 (Non-web document)\
        ·    	11.4.1.2.1 (Open Functionality Software)\
        ·    	11.4.1.2.2 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge’s markup is used according to specification and is accessible.
      </td>
    </tr>
  </tbody>
</Table>

## **Table 2: Success Criteria, Level AA**

Notes: The stated conformance level refers to the **web** aspect, as the Enforcement Challenge is a web-only applet embedded in the customer’s web page or app, without end user documentation. Other aspects (docs, software, authoring tool) therefore do not apply.

<Table>
  <thead>
    <tr>
      <th>
        Criteria
      </th>

      <th>
        Conformance Level
      </th>

      <th>
        Remarks and Explanations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [**1.2.4 Captions (Live)**](http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA)
        Also applies to:

        EN 301 549 Criteria
        ·    	9.1.2.4 (Web)
        ·    	10.1.2.4 (Non-web document)
        ·    	11.1.2.4 (Open Functionality Software)
        ·    	11.1.2.4 (Closed Software)
        ·    	11.8.2 (Authoring Tool)
        ·    	12.1.2 (Product Docs)
        ·    	12.2.4 (Support Docs)

        Revised Section 508
        ·    	501 (Web)(Software)
        ·    	504.2 (Authoring Tool)
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenges do not use any live audio content.
      </td>
    </tr>

    <tr>
      <td>
        [**1.2.5 Audio Description (Prerecorded)**](http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.2.5 (Web)\
        ·    	10.1.2.5 (Non-web document)\
        ·    	11.1.2.5 (Open Functionality Software)\
        ·    	11.1.2.5 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenges do not play any video content that would require audio description or a media alternative.
      </td>
    </tr>

    <tr>
      <td>
        [**1.3.4 Orientation**](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.3.4 (Web)\
        ·    	10.1.3.4 (Non-web document)\
        ·    	11.1.3.4 (Open Functionality Software)\
        ·    	11.1.3.4 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is responsive and adapts its size and layout according to the viewport size and orientation of the user’s device. It works equally well in landscape and portrait orientation.
      </td>
    </tr>

    <tr>
      <td>
        [**1.3.5 Identify Input Purpose**](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.3.5 (Web)\
        ·    	10.1.3.5 (Non-web document)\
        ·    	11.1.3.5.1 (Open Functionality Software)\
        ·    	11.1.3.5.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The purpose of each input field can be programmatically determined.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.3 Contrast (Minimum)**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.3 (Web)\
        ·    	10.1.4.3 (Non-web document)\
        ·    	11.1.4.3 (Open Functionality Software)\
        ·    	11.1.4.3 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge has sufficient color contrast between text and background in its default styling. Customers may chose to customize the Enforcement Challenge styling according to their own branding, in which case it is the customer’s responsibility to ensure sufficient color contrast.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.4 Resize text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.4 (Web)\
        ·    	10.1.4.4 (Non-web document)\
        ·    	11.1.4.4.1 (Open Functionality Software)\
        ·    	11.1.4.4.2 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge allows users to resize text up to 200% without loss of content or functionality.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.5 Images of Text**](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.5 (Web)\
        ·    	10.1.4.5 (Non-web document)\
        ·    	11.1.4.5.1 (Open Functionality Software)\
        ·    	11.1.4.5.2 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not contain images of text.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.10 Reflow**](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.10 (Web)\
        ·    	10.1.4.10 (Non-web document)\
        ·    	11.1.4.10 (Open Functionality Software)\
        ·    	11.1.4.10 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is able to accommodate zoom levels of up to 400% without loss of content or functionality or the need for scrolling in two dimensions. Content will reflow to the available viewport.

        Actual results are dependent on the customer’s implementation of the iframe which embeds the Enforcement Challenge into the customer’s web page, and, as such, are ultimately out of Arkose Labs' control.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.11 Non-text Contrast**](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.11 (Web)\
        ·    	10.1.4.11 (Non-web document)\
        ·    	11.1.4.11 (Open Functionality Software)\
        ·    	11.1.4.11 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge has sufficient color contrast between non-text user interface components and their background in its default styling.

        Customers may chose to customize the Enforcement Challenge styling according to their own branding, in which case it is the customer’s responsibility to ensure sufficient color contrast.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.12 (Web)\
        ·    	10.1.4.12 (Non-web document)\
        ·    	11.1.4.12 (Open Functionality Software)\
        ·    	11.1.4.12 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge allow users to adjust text spacing without loss of content or functionality.
      </td>
    </tr>

    <tr>
      <td>
        [**1.4.13 Content on Hover or Focus**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.1.4.13 (Web)\
        ·    	10.1.4.13 (Non-web document)\
        ·    	11.1.4.13 (Open Functionality Software)\
        ·    	11.1.4.13 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not contain content that appears on focus or hover.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.5 Multiple Ways**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.4.5 (Web)\
        ·    	10.2.4.5 (Non-web document) – Does not apply\
        ·    	11.2.4.5 (Open Functionality Software) – Does not apply\
        ·    	11.2.4.5 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs) Revised Section 508\
        ·    	501 (Web)(Software) – Does not apply to non-web software\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs) – Does not apply to non-web docs
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge is a single-page app. Individual screens within the app by design cannot be located or directly navigated to.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.6 Headings and Labels**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.4.6 (Web)\
        ·    	10.2.4.6 (Non-web document)\
        ·    	11.2.4.6 (Open Functionality Software)\
        ·    	11.2.4.6 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        Each screen of the Enforcement Challenge has appropriate headings and/or labels to describe its purpose.

        The Enforcement Challenge uses H2 headings only, not H1. This is to avoid user confusion when the challenge is embedded on a customer page which already has a H1 heading.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.7 Focus Visible**](http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.2.4.7 (Web)\
        ·    	10.2.4.7 (Non-web document)\
        ·    	11.2.4.7 (Open Functionality Software)\
        ·    	11.2.4.7 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge provides a visible keyboard focus.
      </td>
    </tr>

    <tr>
      <td>
        [**2.4.11 Focus Not Obscured (Minimum)**](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) (Level AA 2.2 only)\
        Also applies to:

        EN 301 549 Criteria – Does not apply

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        Any Enforcement Challenge element receiving keyboard focus is always visible in the user's viewport.
      </td>
    </tr>

    <tr>
      <td>
        [**2.5.7 Dragging Movements**](https://www.w3.org/TR/WCAG22/#dragging-movements) (Level AA 2.2 only)\
        Also applies to:

        EN 301 549 Criteria – Does not apply

        Revised Section 508 – Does not apply
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not require dragging movements for any part of the user interaction.
      </td>
    </tr>

    <tr>
      <td>
        [**2.5.8 Target Size (Minimum)**](https://www.w3.org/TR/WCAG22/#target-size-minimum) (Level AA 2.2 only)\
        Also applies to:

        EN 301 549 Criteria – Does not apply

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The click targets throughout the Enforcement Challenge meet and exceed the minimum size requirements.
      </td>
    </tr>

    <tr>
      <td>
        [**3.1.2 Language of Parts**](http://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.1.2 (Web)\
        ·    	10.3.1.2 (Non-web document)\
        ·    	11.3.1.2 (Open Functionality Software) – Does not apply\
        ·    	11.3.1.2 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge displays all phrases in the page’s native language, which is specified in the document language in the HTML markup.
      </td>
    </tr>

    <tr>
      <td>
        [**3.2.3 Consistent Navigation**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.2.3 (Web)\
        ·    	10.3.2.3 (Non-web document) – Does not apply\
        ·    	11.3.2.3 (Open Functionality Software) – Does not apply\
        ·    	11.3.2.3 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software) – Does not apply to non-web software\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs) – Does not apply to non-web docs
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge uses consistent navigation throughout its different challenge types and games.
      </td>
    </tr>

    <tr>
      <td>
        [**3.2.4 Consistent Identification**](http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.2.4 (Web)\
        ·    	10.3.2.4 (Non-web document) – Does not apply\
        ·    	11.3.2.4 (Open Functionality Software) – Does not apply\
        ·    	11.3.2.4 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software) – Does not apply to non-web software\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs) – Does not apply to non-web docs
      </td>

      <td>
        Supports
      </td>

      <td>
        Within the Enforcement Challenge, any components that have the same functionality are identified consistently across the different challenge types and games.
      </td>
    </tr>

    <tr>
      <td>
        [**3.3.3 Error Suggestion**](http://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.3.3 (Web)\
        ·    	10.3.3.3 (Non-web document)\
        ·    	11.3.3.3 (Open Functionality Software)\
        ·    	11.3.3.3 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Supports
      </td>

      <td>
        The audio challenge provides descriptive error messages, if the user submits invalid characters.
      </td>
    </tr>

    <tr>
      <td>
        [**3.3.4 Error Prevention (Legal, Financial, Data)**](http://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Level AA)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.3.3.4 (Web)\
        ·    	10.3.3.4 (Non-web document)\
        ·    	11.3.3.4 (Open Functionality Software)\
        ·    	11.3.3.4 (Closed Software)\
        ·    	11.8.2 (Authoring Tool)\
        ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508\
        ·    	501 (Web)(Software)\
        ·    	504.2 (Authoring Tool)\
        ·    	602.3 (Support Docs)
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        The Enforcement Challenge does not cause legal commitments or financial transactions for the user to occur.
      </td>
    </tr>

    <tr>
      <td>
        [**3.3.8 Accessible Authentication (Minimum)**](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) (Level AA 2.2 only)\
        Also applies to:

        EN 301 549 Criteria – Does not apply

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge provides the user with two alternatives for solving (visual or audio). At least one of those alternatives is generally an object recognition task, which therefore satisfies this criteria.
      </td>
    </tr>

    <tr>
      <td>
        [**4.1.3 Status Messages**](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 and 2.2)\
        Also applies to:

        EN 301 549 Criteria\
        ·    	9.4.1.3 (Web)\
        ·    	10.4.1.3 (Non-web document)\
        ·    	11.4.1.3 (Open Functionality Software)\
        ·    	11.4.1.3 (Closed Software) – Does not apply\
        ·    	11.8.2 (Authoring Tool) ·    	12.1.2 (Product Docs)\
        ·    	12.2.4 (Support Docs)

        Revised Section 508 – Does not apply
      </td>

      <td>
        Supports
      </td>

      <td>
        Status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus
      </td>
    </tr>
  </tbody>
</Table>

# **Revised Section 508 Report**

Notes:

## **Chapter 3:[Functional Performance Criteria](https://www.access-board.gov/ict/#chapter-3-functional-performance-criteria) (FPC)**

Notes:

<Table>
  <thead>
    <tr>
      <th>
        Criteria
      </th>

      <th>
        Conformance Level
      </th>

      <th>
        Remarks and Explanations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        302.1 Without Vision
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge offers an audio challenge alternative which does not require user vision.
      </td>
    </tr>

    <tr>
      <td>
        302.2 With Limited Vision
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge supports zoom methods and technologies such as browser zoom or screen magnifiers, to assist users with limited vision. It meets minimum contrast ratios, supports high contrast modes, and colour inversion. Additionally, the user can opt to use the audio challenge alternative.
      </td>
    </tr>

    <tr>
      <td>
        302.3 Without Perception of Color
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not rely on color vision to perceive or operate the user interface, nor to solve the visual challenge.
      </td>
    </tr>

    <tr>
      <td>
        302.4 Without Hearing
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge offers a visual challenge alternative which does not require user hearing.
      </td>
    </tr>

    <tr>
      <td>
        302.5 With Limited Hearing
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge offers a visual challenge alternative which does not require user hearing.
      </td>
    </tr>

    <tr>
      <td>
        302.6 Without Speech
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not require user speech.
      </td>
    </tr>

    <tr>
      <td>
        302.7 With Limited Manipulation
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is fully operable (both visual and audio challenges) without pointing devices by keyboard alone. By extension, it can also be operated by any other input devices that emit the standard keyboard events.
      </td>
    </tr>

    <tr>
      <td>
        302.8 With Limited Reach and Strength
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is fully operable (both visual and audio challenges) without pointing devices by keyboard alone. By extension, it can also be operated by any other input devices that emit the standard keyboard events.
      </td>
    </tr>

    <tr>
      <td>
        302.9 With Limited Language, Cognitive, and Learning Abilities
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is designed to be inherently accessibility friendly:

        The challenges use familiar, everyday images or sounds, as well as plain language in instructions. It does not generally enforce a time limit on providing an answer (exceptions exist for known fraudulent traffic). The user is allowed unlimited attempts at solving, without increasing the challenge’s difficulty. Upon a failed attempt, the user is given further solve hints. At any point, the user can toggle between visual and audio challenges depending on ability and preference.
      </td>
    </tr>
  </tbody>
</Table>

## **Chapter 4:[Hardware](https://www.access-board.gov/ict/#chapter-4-hardware)**

Notes: Not applicable.

## **Chapter 5:[Software](https://www.access-board.gov/ict/#chapter-5-software)**

Notes: Not applicable, the Enforcement Challenge does not contain non-web software. See WCAG 2.x section for conformance details for web applications.

## **Chapter 6:[Support Documentation and Services](https://www.access-board.gov/ict/#chapter-6-support-documentation-and-services)**

Notes:

| Criteria                                                                                       | Conformance Level                     | Remarks and Explanations                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ***601.1 Scope***                                                                              | *Heading cell – no response required* | *Heading cell – no response required*                                                                                                                                                                                                                                                                                        |
| [***602 Support Documentation***](https://www.access-board.gov/ict/#602-support-documentation) | *Heading cell – no response required* | *Heading cell – no response required*                                                                                                                                                                                                                                                                                        |
| 602.2 Accessibility and Compatibility Features                                                 | Partially Supports                    | Arkose Labs does not provide any documentation aimed at the end user, as our products in general and the Enforcement Challenge in particular are embedded into the customers' web page or app. Arkose Labs' customer-facing documentation does however include an overview over the level of provided accessibility support. |
| 602.3 Electronic Support Documentation                                                         | See WCAG section                      | See information in WCAG section of this report                                                                                                                                                                                                                                                                               |
| 602.4 Alternate Formats for Non-Electronic Support Documentation                               | Not Applicable                        | All documentation is provided electronically.                                                                                                                                                                                                                                                                                |
| [***603 Support Services***](https://www.access-board.gov/ict/#603-support-services)           | *Heading cell – no response required* | *Heading cell – no response required*                                                                                                                                                                                                                                                                                        |
| 603.2 Information on Accessibility and Compatibility Features                                  | Not Applicable                        | Arkose Labs does not provide support services to end users.                                                                                                                                                                                                                                                                  |
| 603.3 Accommodation of Communication Needs                                                     | Not Applicable                        | Arkose Labs does not provide support services to end users.                                                                                                                                                                                                                                                                  |

# **EN 301 549 Report**

Notes:

## **Chapter 4:[Functional Performance Statements (FPS)](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=20)**

Notes:

<Table>
  <thead>
    <tr>
      <th>
        Criteria
      </th>

      <th>
        Conformance Level
      </th>

      <th>
        Remarks and Explanations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        4.2.1 Usage without vision
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge offers an audio challenge alternative which does not require user vision.
      </td>
    </tr>

    <tr>
      <td>
        4.2.2 Usage with limited vision
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge supports zoom methods and technologies such as browser zoom or screen magnifiers, to assist users with limited vision. It meets minimum contrast ratios, supports high contrast modes, and colour inversion. Additionally, the user can opt to use the audio challenge alternative.
      </td>
    </tr>

    <tr>
      <td>
        4.2.3 Usage without perception of colour
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not rely on color vision to perceive or operate the user interface, nor to solve the visual challenge.
      </td>
    </tr>

    <tr>
      <td>
        4.2.4 Usage without hearing
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge offers a visual challenge alternative which does not require user hearing.
      </td>
    </tr>

    <tr>
      <td>
        4.2.5 Usage with limited hearing
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge offers a visual challenge alternative which does not require user hearing.
      </td>
    </tr>

    <tr>
      <td>
        4.2.6 Usage with no or limited vocal capability
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not require user speech.
      </td>
    </tr>

    <tr>
      <td>
        4.2.7 Usage with limited manipulation or strength
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is fully operable (both visual and audio challenges) without pointing devices by keyboard alone. By extension, it can also be operated by any other input devices that emit the standard keyboard events.
      </td>
    </tr>

    <tr>
      <td>
        4.2.8 Usage with limited reach
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is fully operable (both visual and audio challenges) without pointing devices by keyboard alone. By extension, it can also be operated by any other input devices that emit the standard keyboard events.
      </td>
    </tr>

    <tr>
      <td>
        4.2.9 Minimize photosensitive seizure triggers
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge does not use any flashing effects in the user interface nor the challenge images
      </td>
    </tr>

    <tr>
      <td>
        4.2.10 Usage with limited cognition, language or learning
      </td>

      <td>
        Supports
      </td>

      <td>
        The Enforcement Challenge is designed to be inherently accessibility friendly:

        The challenges use familiar, everyday images or sounds, as well as plain language in instructions. It does not generally enforce a time limit on providing an answer (exceptions exist for known fraudulent traffic). The user is allowed unlimited attempts at solving, without increasing the challenge’s difficulty. Upon a failed attempt, the user is given further solve hints. At any point, the user can toggle between visual and audio challenges depending on ability and preference.
      </td>
    </tr>

    <tr>
      <td>
        4.2.11 Privacy
      </td>

      <td>
        Supports
      </td>

      <td>
        There is no impact on user privacy when using accessibility features to interact with the Enforcement Challenge.
      </td>
    </tr>
  </tbody>
</Table>

## **Chapter 5:[Generic Requirements](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=23)**

Notes: Not applicable.

## **Chapter 6:[ICT with Two-Way Voice Communication](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=30)**

Notes: Not applicable.

## **Chapter 7:[ICT with Video Capabilities](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=35)**

Notes: Not applicable.

## **Chapter 8:[Hardware](https://arkoselabs.atlassian.net/wiki/spaces/FED/pages/edit-v2/2880929793#Chapter-8%3A-Hardware)**

Notes: Not applicable.

## **Chapter 9:[Web](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=45) (see WCAG 2.x section)**

Notes: See WCAG 2.x section.

## **Chapter 10:[Non-Web Documents](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=52)**

Notes: Not applicable.

## **Chapter 11:[Software](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=64)**

Notes: Not applicable, the Enforcement Challenge does not contain non-web software.

## **Chapter 12:[Documentation and Support Services](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=84)**

Notes:

| Criteria                                                       | Conformance Level                     | Remarks and Explanations                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ***12.1 Product documentation***                               | *Heading cell – no response required* | *Heading cell – no response required*                                                                                                                                                                                                                                                                                        |
| 12.1.1 Accessibility and compatibility features                | Partially Supports                    | Arkose Labs does not provide any documentation aimed at the end user, as our products in general and the Enforcement Challenge in particular are embedded into the customers' web page or app. Arkose Labs' customer-facing documentation does however include an overview over the level of provided accessibility support. |
| 12.1.2 Accessible documentation                                | See WCAG 2.x section                  | See information in WCAG 2.x section                                                                                                                                                                                                                                                                                          |
| ***12.2 Support Services***                                    | *Heading cell – no response required* | *Heading cell – no response required*                                                                                                                                                                                                                                                                                        |
| 12.2.2 Information on accessibility and compatibility features | Not Applicable                        | Arkose Labs does not provide support services to end users.                                                                                                                                                                                                                                                                  |
| 12.2.3 Effective communication                                 | Not Applicable                        | Arkose Labs does not provide support services to end users.                                                                                                                                                                                                                                                                  |
| 12.2.4 Accessible documentation                                | See WCAG 2.x section                  | See information in WCAG 2.x section                                                                                                                                                                                                                                                                                          |

## **Chapter 13:[ICT Providing Relay or Emergency Service Access](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf#page=86)**

Notes: Not applicable.

# **Legal Disclaimer**

© 2024 Arkose Labs. The information contained in this conformance report represents the current view of Arkose Labs on the issues discussed as of the date of publication, as stated in the Product Information section of this report. Arkose Labs cannot guarantee that any information in this Conformance Report will remain accurate after the date of publication. Any modification or customization of the product may render some or all of this Conformance Report to become inapplicable. This Conformance Report is provided “as is” and for informational purposes only.