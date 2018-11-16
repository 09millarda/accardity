CREATE TABLE [dbo].[Users] (
    [UserID]        INT           IDENTITY (1, 1) NOT NULL,
    [UserName]      NVARCHAR (50) NOT NULL,
    [ContactNumber] NCHAR (15)    NOT NULL,
    [ContactEmail]  NCHAR (255)   NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserID] ASC)
);

