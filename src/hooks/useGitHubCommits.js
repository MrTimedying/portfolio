import { useState, useEffect } from 'react';

const useGitHubCommits = () => {
  const [commitCounts, setCommitCounts] = useState({
    fulcrum: 0,
    cornea: 0,
    auditor: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCommitsForRepo = async (owner, repo) => {
    try {
      // Get commits from the last week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const since = oneWeekAgo.toISOString();

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?since=${since}&per_page=100`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
            // Note: No authorization token for public repos
          }
        }
      );

      if (response.ok) {
        const commits = await response.json();
        console.log(`${repo}: ${commits.length} commits in the last week`);
        return commits.length;
      } else {
        console.warn(`🔒 GitHub API ${response.status} for ${repo} (private repo or auth required) - using estimated activity`);
        // Return reasonable defaults based on project type instead of random
        const defaults = {
          'fulcrum': 3,    // Management tool - moderate activity
          'cornea': 7,     // AI/Analysis tool - higher activity  
          'auditor_helper': 1  // Utility tool - lower activity
        };
        return defaults[repo] || 2;
      }
    } catch (err) {
      console.error(`Network error fetching ${repo}:`, err);
      // Return reasonable defaults instead of random
      const defaults = {
        'fulcrum': 3,
        'cornea': 7,
        'auditor_helper': 1
      };
      return defaults[repo] || 2;
    }
  };

  useEffect(() => {
    const fetchAllCommits = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch commits for each repository
        const [fulcrumCommits, corneaCommits, auditorCommits] = await Promise.all([
          fetchCommitsForRepo('MrTimedying', 'fulcrum'),
          fetchCommitsForRepo('MrTimedying', 'cornea'),
          fetchCommitsForRepo('MrTimedying', 'auditor_helper')
        ]);

        setCommitCounts({
          fulcrum: fulcrumCommits,
          cornea: corneaCommits,
          auditor: auditorCommits
        });

        console.log('✅ ECG Heart Rates Set:', {
          fulcrum: `${fulcrumCommits} commits/week → ${60 + (fulcrumCommits <= 2 ? fulcrumCommits * 5 : fulcrumCommits <= 7 ? 10 + (fulcrumCommits - 2) * 4 : Math.min(30 + (fulcrumCommits - 7) * 3, 60))} BPM`,
          cornea: `${corneaCommits} commits/week → ${60 + (corneaCommits <= 2 ? corneaCommits * 5 : corneaCommits <= 7 ? 10 + (corneaCommits - 2) * 4 : Math.min(30 + (corneaCommits - 7) * 3, 60))} BPM`,
          auditor: `${auditorCommits} commits/week → ${60 + (auditorCommits <= 2 ? auditorCommits * 5 : auditorCommits <= 7 ? 10 + (auditorCommits - 2) * 4 : Math.min(30 + (auditorCommits - 7) * 3, 60))} BPM`
        });

      } catch (err) {
        console.error('Error fetching commit data:', err);
        setError(err.message);
        // Set reasonable defaults
        setCommitCounts({
          fulcrum: 3,
          cornea: 7,
          auditor: 1
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllCommits();
  }, []); // Only fetch once on mount

  return { commitCounts, loading, error };
};

export default useGitHubCommits; 