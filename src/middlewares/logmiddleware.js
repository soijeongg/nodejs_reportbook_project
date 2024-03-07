import winston from "winston";
import winstonDaily from "winston-daily-rotate-file"

const logDir = "logs"; 
const logger = winston.createLogger({
  format: winston.format.json(), // 로그 포맷을 JSON 형식으로 설정합니다.
  transports: [
    new winston.transports.Console(), // 로그를 콘솔에 출력합니다.
    new winstonDaily({
      level: "info", // info 레벨에선
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

export default function (req, res, next) {
  // 클라이언트의 요청이 시작된 시간을 기록합니다.
  const start = new Date().getTime();

  // 서버에서 모든 비즈니스 로직을 수행한 후 클라이언트에게 응답이 완료되면 로그를 기록합니다.
  res.on("finish", () => {
    const duration = new Date().getTime() - start;
    logger.info(
      `Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, Duration: ${duration}ms`
    );
  });

  next();
}
