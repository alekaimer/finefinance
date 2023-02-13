describe("Example E2E test", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it("Should have sign in screen", async () => {
    const siginTitle = element(
      by.text("Entrar com Google")
    );
    await expect(siginTitle).toBeVisible();
  });
});
