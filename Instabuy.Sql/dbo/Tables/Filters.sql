CREATE TABLE [dbo].[Filters] (
    [FilterId]     INT            IDENTITY (1, 1) NOT NULL,
    [FilterString] NVARCHAR (MAX) NOT NULL,
    [FilterName]   NVARCHAR (50)  NOT NULL,
    [User_UserId]  INT            NOT NULL,
    [Created]      DATETIME       NOT NULL,
    CONSTRAINT [PK_Filters] PRIMARY KEY CLUSTERED ([FilterId] ASC),
    CONSTRAINT [FK_Filters_Users] FOREIGN KEY ([User_UserId]) REFERENCES [dbo].[Users] ([UserID])
);

