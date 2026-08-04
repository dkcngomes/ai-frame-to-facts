# Visionary News AI

# ROLE

You are an elite Full Stack Software Architect, Senior UI/UX Designer, AI Engineer, Product Manager, and Staff-level Software Engineer with 20+ years of experience building production-ready SaaS applications.

Your task is to build a complete production-ready web application.

Think carefully before generating code.

Always optimize for:

- Maintainability

- Scalability

- Clean Architecture

- Security

- Excellent UX

- Accessibility

- Mobile responsiveness

- Performance

- Future extensibility

Never build a quick prototype.

Build production-quality code.

--------------------------------------------------

# PROJECT

Project Name:

NewsVision AI

Tagline:

Transform an uploaded image into a professional newspaper article.

--------------------------------------------------

# GOAL

Create a web application where a user uploads an image.

The application uses AI Vision capabilities to:

1. Analyze the uploaded image

2. Detect:

   - People

   - Objects

   - Actions

   - Locations

   - Context

   - Emotions

   - Environment

   - Possible event

3. Understand the overall story within the image.

4. Generate a realistic, professional newspaper article suitable for publication in a national newspaper.

The generated article should read like it was written by an experienced journalist.

--------------------------------------------------

# IMPORTANT

The AI must NEVER hallucinate facts.

Whenever uncertainty exists, the article must clearly use language such as:

"appears to"

"seems to"

"likely"

"according to the image"

"based on visual observation"

Do NOT invent:

• Names

• Dates

• Locations

• Organizations

• Statistics

• Quotes

• Events

unless they are clearly visible in the image.

--------------------------------------------------

# TARGET USERS

Journalists

Students

Researchers

Media organizations

Content creators

Educators

--------------------------------------------------

# USER FLOW

Landing Page

↓

Upload Image

↓

Preview Image

↓

Analyze Image

↓

Show AI Progress

↓

Generate Article

↓

Display Article

↓

Allow Editing

↓

Copy

↓

Download

↓

Share

--------------------------------------------------

# CORE FEATURES

## Image Upload

Support:

PNG

JPEG

WEBP

Drag & Drop

Click Upload

Image Preview

Replace Image

Remove Image

Maximum file size:

20 MB

--------------------------------------------------

## AI Image Analysis

Analyze:

People

Objects

Scene

Environment

Weather

Activities

Facial expressions

Body language

Vehicles

Buildings

Animals

Text inside image

Logos

Possible context

Possible newsworthiness

--------------------------------------------------

## Newspaper Article Generation

Generate:

Headline

Sub-headline

Lead paragraph

Body

Conclusion

Article metadata:

Estimated category

Confidence level

Keywords

Reading time

Word count

--------------------------------------------------

## Writing Style

Professional journalism

Neutral tone

Objective

Fact-based

Concise

Clear

Engaging

National newspaper standard

Avoid:

Clickbait

Exaggeration

Bias

Political assumptions

Emotional manipulation

--------------------------------------------------

# ARTICLE FORMAT

Headline

Sub-headline

By AI Correspondent

Date Generated

---------------------------------

Lead

---------------------------------

Main Body

---------------------------------

Closing Paragraph

---------------------------------

Image Analysis Summary

---------------------------------

Confidence Score

---------------------------------

Keywords

--------------------------------------------------

# AI PROMPTS

The backend should use carefully engineered prompts.

System Prompt:

"You are an experienced investigative journalist writing for a respected national newspaper.

Only report facts visible within the image.

Never fabricate details.

If uncertain, explicitly state uncertainty.

Maintain a neutral tone.

Write professionally.

Follow AP-style journalism whenever possible."

--------------------------------------------------

# UI DESIGN

Modern

Minimal

Elegant

Clean

Large white spacing

Rounded cards

Professional typography

Soft shadows

Responsive

Dark Mode

Light Mode

--------------------------------------------------

# PAGES

Landing

Upload

Results

History

Settings

About

--------------------------------------------------

# RESULT PAGE

Display:

Uploaded image

Detected objects

Scene summary

Headline

Article

Metadata

Confidence

Buttons:

Copy

Edit

Download PDF

Download DOCX

Download Markdown

Share

Generate Again

--------------------------------------------------

# HISTORY

Store previous analyses.

Allow:

Search

Filter

Delete

Reopen

Duplicate

--------------------------------------------------

# EXPORT

Support:

PDF

Markdown

Word

Plain Text

--------------------------------------------------

# PERFORMANCE

Lazy loading

Image optimization

Compression

Responsive rendering

Loading animations

Skeleton UI

--------------------------------------------------

# ERROR HANDLING

Unsupported image

Corrupted file

Large file

Network failure

AI timeout

Rate limits

Invalid API key

Graceful fallback UI

--------------------------------------------------

# SECURITY

Validate uploads

Sanitize filenames

Prevent XSS

Prevent prompt injection

Prevent malicious uploads

Restrict file types

Environment variables

Secure API routes

--------------------------------------------------

# ACCESSIBILITY

WCAG AA

Keyboard navigation

Screen reader support

ARIA labels

Proper contrast

--------------------------------------------------

# RESPONSIVE DESIGN

Desktop

Tablet

Mobile

--------------------------------------------------

# TECH STACK

Frontend:

React

TypeScript

Vite

TailwindCSS

shadcn/ui

React Query

React Hook Form

Zod

Backend:

Node.js

Express

TypeScript

AI:

OpenAI Vision-compatible API

Database:

Supabase

Authentication:

Supabase Auth

Storage:

Supabase Storage

Deployment:

Vercel

--------------------------------------------------

# PROJECT STRUCTURE

Follow feature-based architecture.

Separate:

Components

Pages

Hooks

Services

API

Utilities

Types

Styles

--------------------------------------------------

# CODE QUALITY

Strict TypeScript

Reusable components

No duplicated code

Meaningful names

SOLID principles

Clean Architecture

Repository pattern where appropriate

--------------------------------------------------

# TESTING

Generate:

Unit tests

Component tests

Integration tests

--------------------------------------------------

# FUTURE FEATURES

Support:

Multiple images

Batch processing

Multi-language articles

Voice narration

AI editor

Fact checking

OCR improvements

CMS integration

--------------------------------------------------

# SUCCESS CRITERIA

The application should feel like a premium AI journalism platform.

The generated article should:

✔ Read naturally

✔ Be professionally structured

✔ Avoid hallucinations

✔ Be objective

✔ Clearly distinguish facts from assumptions

✔ Be suitable for publication after editorial review

--------------------------------------------------

# FINAL INSTRUCTIONS

Before generating code:

1. Design the architecture.

2. Design the database.

3. Design reusable components.

4. Design API contracts.

5. Design AI prompt flow.

6. Identify edge cases.

7. Generate production-quality code.

8. Explain important implementation decisions.

9. Ensure scalability.

10. Ensure maintainability.

Do not simplify the implementation.

Think through every design decision before writing code.

Deliver a polished, production-ready application.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://frame-to-facts.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/457a54e6-1bfe-40aa-904d-38da9cf81450).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
