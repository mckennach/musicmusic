const TimeRange = `
"""
Over what time frame the affinities are computed
"""
enum TimeRange {
  """
  calculated from several years of data and including all new data as it becomes available
  """
  long_term
  """
  approximately last 6 months
  """
  medium_term
  """
  approximately last 4 weeks
  """
  short_term
}
`
export default TimeRange
