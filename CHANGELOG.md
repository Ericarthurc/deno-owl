# Changelog

All notable changes to this project will be documented in this file.

Addition of markdown posts will not be versioned or require a changelog update.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.1] - 2022-5-18

### Added

- testing global state on routers

## [0.6.0] - 2022-5-15

### Changed

- moved from `ejs` to early `eta` support; allowd for layouts and faster parsing
- `parser.ulility.ts` | moved initialization of `Meta.filename` to the parser function and out of the handler helper functions
- `parser.ulility.ts` | moved file reading out of each parser and into its own function that returns the files content as a string; this limits calls to the file system

## [0.5.0] - 2022-5-14

### Added

- wrote out the foundation for the .ejs templates
- rouhgly 70% functionality compared to Rust build right now

## [0.3.0] - 2022-5-12

### Added

- fixed handler type to correctly handle generic path params
- wrote custom meta string parser that is very fast, great for the blog index page

## [0.2.5] - 2022-5-11

### Added

- types.ts
- handler type for Oak

## [0.2.0] - 2022-5-5

### Added

- View engine
- Stared writing parser/meta functions

## [0.1.0] - 2022-5-4

### Added

- Init commit
