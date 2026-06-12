# Laravel Boost

Laravel Boost is a development toolkit MCP server that provides intelligent assistance for Laravel applications. It integrates directly with your Laravel project through Artisan commands, offering context-aware help for common development workflows including Eloquent database queries, route management, schema migrations, and framework-specific code generation.

The plugin runs as an MCP server via `php artisan boost:mcp`, giving Claude direct access to your Laravel application's structure and capabilities. This enables real-time assistance with Laravel's conventions and best practices while you code.

**How to use:** Ask Claude to help with Laravel-specific tasks such as "generate a migration for a posts table with title and content columns", "create an Eloquent model with relationships", "set up API routes for a resource controller", or "run artisan commands to clear cache and optimize the application".