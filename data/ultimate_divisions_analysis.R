### Ultimate article analysis 

metrics_df <- read.csv(file.choose())
points <- read.csv(file.choose())

# Reformat variable types
colnames(metrics_df) <- c('game_id', 'team_name', 'team_type', 'point', 'throw', 'break_throw', 'field', 'defense', 'division')
metrics_df$team_name <- as.character(metrics_df$team_name)
metrics_df$team_type <- as.character(metrics_df$team_type)
metrics_df$field <- as.character(metrics_df$field)
metrics_df$defense <- as.character(metrics_df$defense)
metrics_df$break_throw <- ifelse(is.na(metrics_df$break_throw), 0, metrics_df$break_throw)
metrics_df$throw <- as.character(metrics_df$throw)
metrics_df$division <- as.character(metrics_df$division)
metrics_df$throw <- ifelse(metrics_df$throw=='timeout', 'time-out', metrics_df$throw)
View(metrics_df)

# Correct for errors that occurred in data collection
metrics_df$team_type <- ifelse(metrics_df$game_id==30 & metrics_df$team_name=="sea_mixtape", "lose_team", metrics_df$team_type)
metrics_df$throw <- ifelse(metrics_df$throw=="drop", "turn", metrics_df$throw)
metrics_df$division <- ifelse(metrics_df$division=='', 'mens', metrics_df$division)
metrics_df$field <- ifelse(metrics_df$field=='', 'full', metrics_df$field)
metrics_df <- metrics_df[-7233,]

# Data check 
metrics_df <- metrics_df [-which(metrics_df$throw=="stalled" | metrics_df$throw=="time-out"),] # Delete any throws that are "stalled", "timeouts"
table(metrics_df$throw)

# create groups
game_grp <- group_by(metrics_df, game_id)

# Number of types of throws per game
table(metrics_df$throw, metrics_df$game_id)

# Success rate of certain types of throws
# First, create a variable that indicates success or failure of each throw
metrics_df$successful_throw <- ifelse(metrics_df$throw=='score' | metrics_df$throw=='turn', -1, 1) # a score or turn should not be coded at all; others assume successful for now
i <- 1
for (i in 1:nrow(metrics_df)) { # for every row in metrics_df
  if (metrics_df$throw[i]=='turn') { # if it's a turn
    if (metrics_df$throw[i-1]!='score' & metrics_df$throw[i-1]!='turn') { # if the previous was a score or a turn, then it means that it was the previous team's, so we want to ignore those cases 
      metrics_df$successful_throw[i-1] <- 0
    }
  }
}
# diagnostics
table(subset(metrics_df, metrics_df$successful_throw==1)$throw)
table(subset(metrics_df, metrics_df$successful_throw==0)$throw)
table(subset(metrics_df, metrics_df$successful_throw==-1)$throw)
View(metrics_df)

# Create a df of possessions
create_possessions <- function(game_id_input, team_type_input) {
  metrics_subset <- subset(metrics_df, metrics_df$game_id==game_id_input & metrics_df$team_type==team_type_input)
  metrics_subset$n_throws <- 1 # assume 1 for now
  metrics_subset$last_throw <- metrics_subset$throw
  metrics_subset$first_throw <- metrics_subset$throw
  possessions <- metrics_subset[1,]
  i = 1 # index for metrics df
  j = 2 # index for possessions df - starts at 2 because of the first init row in possessions
  while (i<=nrow(metrics_subset)) { # while there are still more rows in metrics df
    n_throws <- 0
    field_pos <- metrics_subset$field[i] # store field position
    first_throw <- metrics_subset$throw[i] # store first throw
    # while it's a throw
    while (metrics_subset$throw[i]=='over' | metrics_subset$throw[i]=='dish' | metrics_subset$throw[i]=='down' | metrics_subset$throw[i]=='dump' | 
           metrics_subset$throw[i]=='huck' | metrics_subset$throw[i]=='swing' | metrics_subset$throw[i]=="callahan") { 
      n_throws <- n_throws + 1 # keep a tally of number of throws
      i <- i+1 # go through rows
    }
    # no longer the same point or possession
    possessions <- rbind(possessions, metrics_subset[i,]) # add in row
    possessions$last_throw[j] <- metrics_subset$throw[(i-1)] # last throw in possession
    possessions$n_throws[j] <- n_throws # enter final count of throws in possession
    possessions$field[j] <- field_pos # starting field position
    possessions$first_throw[j] <- first_throw # first throw
    i <- i+1
    j <- j+1 # move on to the next possession
  }
  possessions <- possessions[-1,]
  return(possessions)
}
possessions <- data.frame()
for (g in unique(metrics_df$game_id)) {
  win_output <- create_possessions(g, 'win_team')
  lose_output <- create_possessions(g, 'lose_team')
  possessions <- rbind(possessions, win_output, lose_output)
}
colnames(possessions) <- c('game_id', 'team_name', 'team_type', 'point', 'possession_result', 'break_throw', 'starting_fieldpos', 'defense', 'division', 'successful_throw', 'sum_throws', 'last_throw', 'first_throw')
rownames(possessions) <- seq(length=nrow(possessions)) # reset row index

# Create df from possessions grouped by points
points_grp <- possessions %>% group_by(game_id, point, team_type) %>%
  summarise(n_possessions = n(), n_throws = sum(sum_throws), n_turns = sum(possession_result=='turn'), scored = sum(possession_result=='score'))
points_merged <- merge(points_grp, points, by = c('game_id', 'point'))
# diagnostics
sum(points_merged$scored) 
nrow(subset(possessions, possession_result=='score')) # they match

possessions <- merge(possessions, points_merged[,c(1,2,3,10)], by = c('game_id', 'point', 'team_type'))
possessions$possession_number <- 0
point <- 0
possession_count <- 1
i <- 1
for (i in 1:nrow(possessions)) {
  if (possessions$point[i]!=point) { # point is different, so must be first possession
    possession_count <- 1
  }
  else { # otherwise, same point so a new possession w/in
    possession_count <- possession_count + 1 # increase count
  }
  possessions$possession_number[i] <- possession_count
  point <- possessions$point[i]
  i <- i+1
}

# Create one df with all points - points_merged currently has entries for each team type per point
turns_points <- points_merged %>% group_by(game_id, point, division) %>%
  summarise(n_turns = sum(n_turns))



#### Analysis
table(metrics_df$division)

# Helpful subgroups
win_points_sub <- subset(points_merged, team_type=='win_team') # win team's points
lose_points_sub <- subset(points_merged, team_type=='lose_team') # lose team's points
person_possessions <- subset(possessions, possessions$defense=='person')
person_metrics <- subset(metrics_df, defense=='person')
o_points <- subset(points_merged, start_o==team_type)
d_points <- subset(points_merged, start_o!=team_type) # fewer D points because of the no turnover O points. If O doesn't turn it over, D never gets to have possession

# Proportion of throws 
throws_sub <- subset(person_metrics, throw!='callahan' & throw!='turn' & throw!='score' & throw!='dish')
prop.table(table(throws_sub$throw, throws_sub$division), 2)*100 # throws by game

# success rate of certain throws
prop.table(table(subset(throws_sub, division=="mens")$successful_throw))*100 # all throws
prop.table(table(subset(throws_sub, division=="mixed")$successful_throw))*100
prop.table(table(subset(throws_sub, division=="womens")$successful_throw))*100

prop.table(table(subset(person_metrics, division=="mens")$successful_throw, subset(person_metrics, division=="mens")$throw), 2)*100
prop.table(table(subset(person_metrics, division=="mixed")$successful_throw, subset(person_metrics, division=="mixed")$throw), 2)*100
prop.table(table(subset(person_metrics, division=="womens")$successful_throw, subset(person_metrics, division=="womens")$throw), 2)*100

# Types of throws that caused scores
scores_sub <- subset(person_possessions, person_possessions$possession_result=='score') # needs to be person-D
table(subset(scores_sub, scores_sub$division=="mens")$last_throw)/nrow(subset(scores_sub, scores_sub$division=="mens"))*100
table(subset(scores_sub, scores_sub$division=="mixed")$last_throw)/nrow(subset(scores_sub, scores_sub$division=="mixed"))*100
table(subset(scores_sub, scores_sub$division=="womens")$last_throw)/nrow(subset(scores_sub, scores_sub$division=="womens"))*100

# Number of throws
allthrows_sub <- subset(metrics_df, throw!='callahan' & throw!='turn' & throw!='score')
tapply(allthrows_sub$successful_throw>-1, allthrows_sub$game_id, sum)

### TURNOVERS
# What percent of points had turnovers?
table(turns_points$n_turns)
nrow(subset(turns_points, division=="mens" & n_turns>0))/nrow(subset(turns_points, division=="mens")) # turnpoints - each row is a point in a game 
nrow(subset(turns_points, division=="mixed" & n_turns>0))/nrow(subset(turns_points, division=="mixed")) 
nrow(subset(turns_points, division=="womens" & n_turns>0))/nrow(subset(turns_points, division=="womens")) 

# In the points with turnovers, how many were there? 
turnovers_sub <- subset(turns_points, division=="mens" & n_turns>0)
summary(turnovers_sub$n_turns)
turnovers_sub <- subset(turns_points, division=="mixed" & n_turns>0)
summary(turnovers_sub$n_turns)
turnovers_sub <- subset(turns_points, division=="womens" & n_turns>0)
summary(turnovers_sub$n_turns)


### FIELD POSITION
# Where do teams start after a turnover? 
head(possessions)
prop.table(table(possessions$starting_fieldpos))*100 # all points
post_turnover_sub <- subset(possessions, possession_number>1 | (possession_number==1 & team_type!=start_o)) # either possession # is not 1 or it is #1 but they didn't start on O 
table(subset(possessions, possession_number==1 & team_type==start_o)$starting_fieldpos) # check
table(post_turnover_sub$starting_fieldpos, post_turnover_sub$division) # after turnovers


### OFFENSIVE EFFICIENCY
# Offensive holds
win_oPoints <- subset(o_points, team_type=="win_team")
lose_oPoints <- subset(o_points, team_type=="lose_team")
head(o_points)
prop.table(table(subset(win_oPoints, division=='mens')$scored))*100 # winning team
prop.table(table(subset(win_oPoints, division=='mixed')$scored))*100 # winning team
prop.table(table(subset(win_oPoints, division=='womens')$scored))*100 # winning team

# Percent of scores that had no turnovers - winning teams
nrow(subset(win_oPoints, division=="mens" & n_turns==0 & scored==1))/nrow(subset(win_oPoints, division=="mens"))*100 # for winning teams' O line
nrow(subset(win_oPoints, division=="mixed" & n_turns==0 & scored==1))/nrow(subset(win_oPoints, division=="mixed"))*100 # for winning teams' O line
nrow(subset(win_oPoints, division=="womens" & n_turns==0 & scored==1))/nrow(subset(win_oPoints, division=="womens"))*100 # for winning teams' O line

# Rebased to be out of holds 
nrow(subset(win_oPoints, division=="mens" & n_turns==0 & scored==1))/nrow(subset(win_oPoints, division=="mens" & scored==1))*100 # for winning teams' O line
nrow(subset(win_oPoints, division=="mixed" & n_turns==0 & scored==1))/nrow(subset(win_oPoints, division=="mixed" & scored==1))*100 # for winning teams' O line
nrow(subset(win_oPoints, division=="womens" & n_turns==0 & scored==1))/nrow(subset(win_oPoints, division=="womens" & scored==1))*100 # for winning teams' O line

# Percent of points that had no turnovers out of holds - losing teams
nrow(subset(lose_oPoints, division=="mens" & n_turns==0 & scored==1))/nrow(subset(lose_oPoints, division=="mens" & scored==1))*100 # for winning teams' O line
nrow(subset(lose_oPoints, division=="mixed" & n_turns==0 & scored==1))/nrow(subset(lose_oPoints, division=="mixed" & scored==1))*100 # for winning teams' O line
nrow(subset(lose_oPoints, division=="womens" & n_turns==0 & scored==1))/nrow(subset(lose_oPoints, division=="womens" & scored==1))*100 # for winning teams' O line


### DEFENSE
# Successful defensive rate - winnin teams
# D-line points that generated turns
nrow(subset(d_points, division=="mens" & team_type=='win_team'))/nrow(subset(points, division=="mens" & start_o=='lose_team'))*100
nrow(subset(d_points, division=="mixed" & team_type=='win_team'))/nrow(subset(points, division=="mixed" & start_o=='lose_team'))*100
nrow(subset(d_points, division=="womens" & team_type=='win_team'))/nrow(subset(points, division=="womens" & start_o=='lose_team'))*100

# Scores
nrow(subset(d_points, division=="mens" & team_type=='win_team' & scored==1))/nrow(subset(points, division=="mens" & start_o=='lose_team'))*100
nrow(subset(d_points, division=="mixed" & team_type=='win_team' & scored==1))/nrow(subset(points, division=="mixed" & start_o=='lose_team'))*100
nrow(subset(d_points, division=="womens" & team_type=='win_team' & scored==1))/nrow(subset(points, division=="womens" & start_o=='lose_team'))*100



# D-line scores out of all had-disc points
nrow(subset(d_points, division=="mens" & team_type=='win_team' & scored==1))/nrow(subset(d_points, division=="mens" & team_type=='win_team')) 
nrow(subset(d_points, division=="mixed" & team_type=='win_team' & scored==1))/nrow(subset(d_points, division=="mixed" & team_type=='win_team')) 
nrow(subset(d_points, division=="womens" & team_type=='win_team' & scored==1))/nrow(subset(d_points, division=="womens" & team_type=='win_team')) 

