function getActiveAdultUsers(users) {
  if (!Array.isArray(users)) {
    return [];
  }

  return users
    .filter((user) => user.active === true)
    .filter((user) => user.age > 18)
    .map((user) => `${user.name} - ${user.age}`);
}

module.exports = { getActiveAdultUsers };