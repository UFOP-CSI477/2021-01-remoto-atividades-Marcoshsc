-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_votingId_fkey";

-- DropForeignKey
ALTER TABLE "VotingUser" DROP CONSTRAINT "VotingUser_votingId_fkey";

-- AddForeignKey
ALTER TABLE "VotingUser" ADD CONSTRAINT "VotingUser_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "Voting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "Voting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
