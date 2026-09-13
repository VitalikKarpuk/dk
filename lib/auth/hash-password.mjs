/**
 * Хэш пароля для переменной ADMIN_PASSWORD_HASH.
 *
 * Запуск:  node lib/auth/hash-password.mjs 'ваш-пароль'
 *
 * Печатает две записи одного и того же хэша, потому что в двух местах
 * он пишется по-разному:
 *
 *  — в Vercel значение вставляется как есть;
 *  — в `.env`-файле каждый `$` нужно экранировать. Next разворачивает
 *    `$ИМЯ` как ссылку на другую переменную, а хэш начинается с
 *    `$2b$12$` — без экранирования от него остаётся хвост после
 *    последнего `$`, и верный пароль отвергается как неверный.
 *
 * Сам пароль нигде не хранится: из хэша его не достать, и в репозиторий
 * он не попадает даже случайно.
 */
import { hash } from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Использование: node lib/auth/hash-password.mjs 'ваш-пароль'");
  process.exit(1);
}

if (password.length < 12) {
  console.error("Пароль короче 12 символов — возьмите длиннее.");
  process.exit(1);
}

/* 12 раундов: примерно четверть секунды на серверлес-функции. Меньше —
   перебор дешевеет, больше — вход начинает ощущаться медленным. */
const value = await hash(password, 12);

console.log("\nДля Vercel → Settings → Environment Variables (вставить как есть):\n");
console.log(`  ${value}\n`);
console.log("Для .env.local — строкой целиком, доллары экранированы:\n");
console.log(`  ADMIN_PASSWORD_HASH=${value.replaceAll("$", "\\$")}\n`);
