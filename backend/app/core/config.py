from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    project_name: str = "Contigo Antioquia API"
    api_prefix: str = "/api/v1"

    mysql_user: str = "root"
    mysql_password: str = "secret"
    mysql_host: str = "localhost"
    mysql_port: int = 3306
    mysql_db: str = "contigo_db"

    allowed_origins: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file="env.example", env_file_encoding="utf-8")

    @property
    def database_url(self) -> str:
        user = self.mysql_user
        password = self.mysql_password
        host = self.mysql_host
        port = self.mysql_port
        db = self.mysql_db
        return f"mysql+aiomysql://{user}:{password}@{host}:{port}/{db}"


settings = Settings()

