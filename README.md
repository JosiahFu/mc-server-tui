# `mc-server-tui`

A Terminal User Interface (TUI) for Minecraft servers. It colorizes the log so
it's easier to see warnings and errors, and it prevents new log entries from
messing up the command input.

## Usage

```
mc-server-tui [--stop-command COMMAND] COMMAND
```

Press Ctrl+C to send the stop command to the server, then Ctrl+C again to force
stop if the server is unresponsive.

### Options

**--stop-command** Set the admin command to send to Minecraft to stop it.
`stop` by default.

## Examples

If you start your server by running a script called `start.sh`:

```
mc-server-tui ./start.sh
```

If you run the jar with arguments directly:

```
mc-server-tui java -Xmx4096M -Xms4096M -jar server.jar nogui
```

If your server uses a custom function to stop the server:

```
mc-server-tui --stop-command 'function run scripts:stop' ./start.sh
```
