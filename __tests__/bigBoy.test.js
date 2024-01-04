const { deletePostsById, patchPostById } = require("../src/app/api/posts/[id]/route");
const seedDatabase = require("../seed/seed");

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe("Delete a Jimmy", () => {
  test("204 - Deletes a jimmy and returns nothing", async () => {
    const response = await deletePostsById(1);
    expect(response.status).toBe(200);

    const deletePost = await response.json();
    expect(deletePost).toEqual({});
  });

  test("400 - Incorrect Data Type", async () => {
    const response = await deletePostsById("Banana");
    expect(response.status).toBe(400);

    const err = await response.json();
    expect(err).toBe("Incorrect Data Type");
  });

  test("404 - No Post Found", async () => {
    const response = await deletePostsById(99);
    expect(response.status).toBe(404);

    const err = await response.json();
    expect(err).toBe("No posts found");
  });
});

describe('Patching a post By Id', ()=>{
    test('200 - Patches Post and return updated post', async ()=>{
        const response = await patchPostById(1)
        expect(response.status).toBe(200)

        const post = await response.json()
        expect(post.posts).toMatchObject({
            post_id: 1,
            likes: 4,
            session_name: 'afternoon pump baby!!',
            description: 'feeling huge now',
            session_id: 1,
            user_id: 1
        })
    })

    test('400 - Incorrect Data Type', async ()=>{
        const response = await patchPostById("Banana");
        expect(response.status).toBe(400);

        const err = await response.json();
        expect(err).toBe('Incorrect Data Type');
    })

    test('404 - Post not found', async ()=>{
        const response = await patchPostById(99);
        expect(response.status).toBe(404);

        const err = await response.json();
        expect(err).toBe('No posts found');
    })
})