from rich.logging import RichHandler
import logging

def get_logger(name: str) -> logging.Logger:
    """
    Returns a Rich-enabled logger with the given name, without timestamps.
    """
    logger = logging.getLogger(name)
    
    if not logger.hasHandlers():
        logger.setLevel(logging.DEBUG)  # or INFO
        handler = RichHandler(rich_tracebacks=True, show_time=False)  # <- hide time
        formatter = logging.Formatter("%(message)s")  # only the message
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger
