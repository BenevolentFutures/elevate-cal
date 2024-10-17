# Elevated Calendar

### Product Overview

**Elevated Calendar** is a community-driven event platform designed to streamline the interaction between individual schedules and the collective event landscape of Edge City Lanna. The core value lies in transforming information overload into a curated, personalized experience. By aggregating event data from the Social Layer API, Elevated Calendar empowers users to elevate the events that matter most to them, creating a communal view of what the community values.

The platform addresses the challenge of information overload in highly active communities, where dozens of events are generated every day. Elevated Calendar serves as a second-layer tool, improving the interface between individual schedules and the community's dynamic collective event set. Users can quickly register via email to get started, with minimal barriers, and password-based authentication will be implemented in future iterations.

### User Interaction

Users interact with the platform through two primary views:
- **Timeline View**: A linear list of events organized by start time to validate and iterate core features.
- **Calendar View (Upcoming)**: A more traditional grid-based calendar interface for long-term planning.

Users can promote events they like, adding them to their personalized calendar. Highly promoted events are marked as "Community Favorites" and become visually prominent. Initially, any event promoted by at least two people is considered a Community Favorite.

Users can subscribe to three iCal (standard calendar format) feeds:
1. General feed (all events)
2. The users individually promoted events
3. Community Favorites

These feeds integrate seamlessly with external tools like Google Calendar via iCal, updating every 15 minutes.

### Technical Summary

The project is built using **Next.js**, **MySQL**, and **NGINX**, hosted on a **DigitalOcean droplet**. The technical structure ensures rapid iteration, high scalability, and easy maintenance.

#### Front-End
- **Framework**: Built with **Next.js** for dynamic, server-side rendered pages.
- **Components**: Includes registration forms, event detail pages, and buttons for promoting events. 
- **Real-Time Interaction**: Promotion counts update in real-time using WebSockets or a polling strategy.

#### Back-End
- **API**: Built using **Next.js API routes** to provide RESTful endpoints for event management and user interactions.
- **Event Data Synchronization**: Event data is synchronized with the Social Layer API every 15 minutes.
- **Authentication**: Initial implementation with email registration, with plans for secure password-based authentication using **bcrypt**.

#### Database
- **MySQL**: 
  - **Users**: Stores user data.
  - **Events**: Stores event metadata.
  - **Promotions**: Tracks user-promoted events.
  - **Recurring Events**: Identified based on event titles. Updates and cancellations are managed while maintaining historical data.

### Deployment & Security
- **Hosting**: Deployed on a **DigitalOcean droplet** with **NGINX** as a reverse proxy.
- **Security**: SSL via **Let's Encrypt** and user password hashing with **bcrypt**.
- **iCal Integration**: Three distinct calendar feeds are generated (normal, promoted, community favorites), updating every 15 minutes.

### Information Layers
There are three core information layers:
1. **Normal Events**: All events sourced from the Social Layer API.
2. **Elevated Events**: User-selected events added to personal calendars.
3. **Community Favorites**: Events promoted by multiple users, representing collective interest.

### Interface Details

#### Timeline View
The **Timeline View** provides a linear list of events, sorted by start time, for a simplified and efficient interface.

- **Structure**: Events are sorted by start time for a clear, organized view of the day's activities.
- **Interaction**: Users can promote events to their personal calendar and community, and view event details.
- **Real-Time Updates**: Promotion counts update in real time.
- **Desktop-First Design**: Optimized for desktop use, with an uncluttered, spacious layout.

#### Calendar View (Future Development)
The **Calendar View** will present events in a traditional grid format (day/week/month), offering more comprehensive planning tools and filtering options.

---

### Database Structure

#### Tables:
- **Users**: Stores user information (id, handle, username, etc.).
- **Groups**: Stores group information related to events.
- **Events**: Contains event details like title, start/end time, location, and promotion count.
- **Promotions**: Tracks which users have promoted which events.

For more detailed information on the database, execute the script:
```bash
node scripts/db_printStructure.js
