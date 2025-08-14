bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground">Secure Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-overlay">
                <CardDescription className="text-muted-foreground text-center text-sm sm:text-base">
                  Military-grade encryption protects your digital assets and identity data with Apple-level security.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground">Credit Building</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-overlay">
                <CardDescription className="text-muted-foreground text-center text-sm sm:text-base">
                  Build and manage your credit score with our advanced AI-powered tools and exclusive tradelines.
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card sm:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground">Exclusive Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-overlay">
                <CardDescription className="text-muted-foreground text-center text-sm sm:text-base">
                  Access billionaire-tier rewards and benefits as a premium Crypdawgs member.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}