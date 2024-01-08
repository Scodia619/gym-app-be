const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");
const { handlePsqlErrors } = require("../../../../_utils/errors");

async function getCurrentId() {
  const currentId = await prisma.loggedWorkouts.findFirst({
    orderBy: { completed_at: "desc" },
    select: {
      session_id: true,
    },
  });
  return NextResponse.json(currentId, { status: 200 });
}
async function postLoggedWorkout(newLoggedWorkout) {
  try {
    const loggedWorkout = await prisma.loggedWorkouts.create({
      data: newLoggedWorkout,
    });
    return NextResponse.json(loggedWorkout, { status: 201 });
  } catch (error) {
    console.log(error);
    return handlePsqlErrors(error);
  }
}

module.exports = { postLoggedWorkout, getCurrentId };